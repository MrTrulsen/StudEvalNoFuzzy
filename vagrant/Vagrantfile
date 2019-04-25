Vagrant.configure("2") do |config|

    config.vm.box = "studeval_db"
    # config.vm.box_url = "https://cloud-images.ubuntu.com/xenial/current/xenial-server-cloudimg-i386-vagrant.box"
    config.vm.box_url = "https://cloud-images.ubuntu.com/cosmic/current/cosmic-server-cloudimg-amd64-vagrant.box"
   	config.vm.host_name = "studevaldb"

    config.vm.hostname = "studevaldb"
    config.vm.network :private_network, ip: "192.168.50.50"
    config.vm.provision :shell, :path => "installation.sh"
	config.vm.network "forwarded_port", guest: 80, host: 1234


end
