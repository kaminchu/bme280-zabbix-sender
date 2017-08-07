import cron from "node-cron";
import BME280 from "node-bme280";
import ZabbixSender from "node-zabbix-sender";

const {
  HOST,
  PORT,
  ZABBIX_HOST,
  ZABBIX_ITEM_KEY
} = process.env;

const bme280 = new BME280({ address: 0x76 });
const Sender = new ZabbixSender({ host: HOST, port: PORT });

cron.schedule("* * * * *", () => {

  bme280.begin((err) => {
    if (err) {
      console.error("bme280 initializing error", err);      
      throw err;
    }
    bme280.readPressureAndTemparature((_err, pressure, temperature, humidity) => {
      if (_err) {
        console.error("bme280 read error", _err);      
        throw err;
      }
      Sender.addItem(ZABBIX_HOST, ZABBIX_ITEM_KEY, parseFloat(temperature));
      Sender.send((__err, res) => {
        if (__err) {
          console.error("zabbix send error");
          throw __err;
        }
        console.log("data sended. temperature: " + temperature );
        console.log(res);
      });
    });
  });
});

