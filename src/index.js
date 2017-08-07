import cron from "node-cron";
import BME280 from "node-bme280";
import ZabbixSender from "node-zabbix-sender";

const zabbixHost = process.env.ZABBIX_HOST | "localhost";

const bme280 = new BME280({ address: 0x76 });
const Sender = new ZabbixSender({ host: zabbixHost });

cron.schedule("* * * * *", () => {

  bme280.begin((err) => {
    if (err) {
      console.error("bme280 initializing error", err);
      return;
    }
    bme280.readPressureAndTemparature((err, pressure, temperature, humidity) => {
      Sender.addItem("room_temp", temperature).send((err, res) => {
        if (err) {
          throw err;
        }
        console.dir(res);
      });
      console.log("running a task every minute");
    });
  });
});

