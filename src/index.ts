import {schedule} from "node-cron";
import BME280 from "bme280-sensor";
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

const bme280 = new BME280();
const Sender = new ZabbixSender({ host: SERVER_HOST, port: parseInt(SERVER_PORT || "10051", 10) });

const readSensorData = () => {
  bme280.readSensorData()
    .then((data: any) => {
      Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_TEMP, data.temperature_C);
      Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_HUM, data.humidity);
      Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY_PRESS, data.pressure_hPa);
      Sender.send((__err: any, res: any) => {
        if (__err) {
          console.error("zabbix send error");
          throw __err;
        }
        console.log(res);
      });
 
      console.log(`data = ${JSON.stringify(data, null, 2)}`);
    })
    .catch((err: any) => {
      console.log(`BME280 read error: ${err}`);
    });
};

bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded');
    schedule(CRON_STRING || "* * * * *", readSensorData);
  })
  .catch((err: any) => console.error(`BME280 initialization failed: ${err} `));
