import socket

def service():
    # system ip address information
    hostname = socket.gethostname()
    IPAddr = socket.gethostbyname(hostname)
    
    # list of running processes
    
    
