#!/usr/bin/ruby


STDOUT.sync = true


while 1
  line = STDIN.readline.strip
    if line=="shoot" #will trigger the photo
      # cd /tmp... is a workaround: if the filesystem is ro, then you must first navigate into destination dir!!
	    system("cd /tmp && sudo -u pi /usr/bin/gphoto2 --keep-raw --capture-image-and-download --hook-script /home/pi/.gphoto/hookscript.sh --filename /tmp/%d%m%y%H%M%S.jpg >>/tmp/photobox.log 2>&1")
    end
    if line=="resume" #handles resuming after paperjam
	    system("/usr/sbin/cupsenable Canon_CP910 >>/tmp/photobox.log 2>&1")
    end
    if line[0..4]=="print"
        print=line.split(",")
	    system("/usr/bin/lp -d Canon_CP910 /tmp/#{print[1]} >>/tmp/photobox.log 2>&1")
    end
end
