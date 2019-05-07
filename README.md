# StudEvalNoFuzzy
This project is about...

## Setup
The necessary files can be found in the releases tab. 

The MySql databese with the right tables and login information is needed to successfully run the webserver. The innstallation.sh will take care of this just by running it once. 
```sudo bash installation.sh```

Sometimes it will return a bunch of error messages like: 
![image](https://user-images.githubusercontent.com/7957939/57330070-5244c000-7115-11e9-82dc-84203fa432aa.png)
This can be fixed by running ``sudo apt-get install dos2unix`` and ``sudo dos2unix installation.sh``. 

After that, you can try to run ```sudo bash installation.sh``` again. 

The installation file will run for a long time so be patient. When it is finished, it will return: ```Installation of the database is done.```

When the installation is finished, you can finally run the webserver by running ```sudo java -jar StudEvalNoFuzzy-x.x.x.jar```
