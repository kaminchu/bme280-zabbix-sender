// @flow
import cron from "node-cron";
import BME280 from "node-bme280";
import ZabbixSender from "node-zabbix-sender";
import {} from "dotenv/config";

import type {ProcessEnv} from "./types";

const {
  HOST,
  PORT,
  ZABBIX_HOST,
  ZABBIX_ITEM_KEY
}: ProcessEnv = process.env;

const bme280 = new BME280({ address: 0x76 });
const Sender = new ZabbixSender({ host: HOST, port: parseInt(PORT, 10 ) });

bme280.begin((err) => {
  if (err) {
    console.error("bme280 initializing error", err);      
    throw err;
  }
});

cron.schedule("* * * * *", () => {

    bme280.readPressureAndTemparature((_err, pressure, temperature, humidity) => {
      if (_err) {
        console.error("bme280 read error", _err);      
        throw _err;
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


