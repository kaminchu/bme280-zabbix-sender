# Send Room Temper

zabbixにbme280から取得した温度を送りたかった

## Getting Started
install git
```
sudo apt install git
```

install node
```
sudo apt-get install -y nodejs npm
sudo npm cache clean
sudo npm install n -g
	
sudo n v10.14.1
sudo apt-get purge -y nodejs npm
```

raspberrypi+bme280が必須。  
`.env.sample`をコピーして`.env`を作成して、よしなにする。

```
npm install
npm start
```

## Generating Startup Script


```
sudo npm install pm2 -g
sudo pm2 start pm2.json
sudo pm2 save
```
で表示されるコマンドを実行



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

