# Wedding photobox
## description
This will help you setup your own photobox. It - especially the frontent-code - is not perfectly clean, but it works!

## required software
- gphoto2
- cups
- uhubctl (if used with a nikon-dslr)
- ruby
- nginx or other webserver

## required hardware
- gphoto2 compatible camera
- cups compatible printer
- raspberry pi 3b

## Installation
- Install required software
- Setup Raspi as AP (https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md - without bridge)
- Make RasPi read only (http://hallard.me/raspberry-pi-read-only/)
- Try following steps manually
-- Take photo with gphoto2 (see command in backend/comm.rb)
-- Print photo manually with cups (see command in backend/comm.rb)
- Copy websocket.service to /etc/systemd/system/ and start / enable the service
- Point webserver into frontend-directory


## tricks
- nikon-dslrs tend to keep measuring up when on USB. this will empty the battery incredibly fast!! by using uhubctl https://github.com/mvp/uhubctl you can *completely* switch of power on usb-ports
- read-only filesystem helps keeping filesystem getting corrupted when switching it off improperly
- pics/background1.jpg is the default background of the photobox

## credits
- https://github.com/joewalnes/reconnecting-websocket
- https://github.com/joewalnes/websocketd
- https://github.com/gphoto/gphoto2
- https://github.com/mvp/uhubctl
