# -*- coding: utf-8 -*-
import os, subprocess, zipfile, shutil, socket


hostName = socket.gethostname()
if hostName == "iZ7ly5hsshewqrZ":
    #服务器
    password = b'caonima'
    folderName = 'temp'
    rootPath = 'C:\\Users\\Administrator\\Documents\\proj\\replace\\aeProj\\test'
    tempDirPath = rootPath + '\\' + folderName
    zipPath = rootPath + '\\' + folderName + "\\replace.zip"
    jsonPath = rootPath + '\\' + folderName + "\\replace.txt"
    jsxScript = "C:/Users/Administrator/Documents/proj/replace/script/aeReplace.jsx"
else:
    #本机
    password = b'caonima'
    folderName = 'temp'
    rootPath = 'D:\\python\\tensorFlow'
    tempDirPath = rootPath + '\\' + folderName
    zipPath = rootPath + '\\' + folderName + "\\replace.zip"
    jsonPath = rootPath + '\\' + folderName + "\\replace.txt"
    jsxScript = "D:/aeProj/aeReplace.jsx"

try:
    os.mkdir(tempDirPath)
except OSError:
    pass

print(tempDirPath)
#解压文件
z = zipfile.ZipFile(zipPath, "r")
for filename in z.namelist():
        print(filename)
        # data = z.read(filename, pwd = password)
        print(bytes)
        z.extract(filename, tempDirPath, pwd = password)
#json处理
file = open(jsonPath)
json = file.read()
json = json.replace('\"', "\'")
json = json.replace('%PATH%', tempDirPath.replace('\\', "/"))
print(json)
file.close()
z.close()


#.\AfterFX.exe  -s "$.evalFile('D:\\aeProj\\renderAll.jsx');"
rtn = subprocess.call(['C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\afterfx.exe',
                            '-noui',
                            '-s', 'var json = ' + json + ';'\
                                  '$.evalFile(\'' + jsxScript + '\');'])


#删除临时文件和zip
# shutil.rmtree(tempDirPath)
