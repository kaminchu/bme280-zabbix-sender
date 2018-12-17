import {schedule} from "node-cron";
import BME280 from "node-bme280";
import ZabbixSender from "node-zabbix-sender";
import "dotenv/config";

const {
  SERVER_HOST,
  SERVER_PORT,
  ZABBIX_HOST,
  ZABBIX_ITEM_KEY_TEMP,
  ZABBIX_ITEM_KEY_HUM,
  ZABBIX_ITEM_KEY_PRESS,
  CRON_STRING
} = process.env;

const bme280 = new BME280({ address: 0x76 });
const Sender = new ZabbixSender({ host: SERVER_HOST, port: parseInt(SERVER_PORT, 10) });

bme280.begin((err) => {
  if (err) {
    console.error("bme280 initializing error", err);
    throw err;
  }
});

schedule(CRON_STRING, () => {

  bme280.readPressureAndTemparature((_err, pressure, temperature, humidity) => {
    if (_err) {
      console.error("bme280 read error", _err);
      throw _err;
    }
    Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_TEMP, temperature);
    Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_HUM, humidity);
    Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_PRESS, pressure / 100);
    Sender.send((__err, res) => {
      if (__err) {
        console.error("zabbix send error");
        throw __err;
      }
      console.log(res);
    });
  });
});
