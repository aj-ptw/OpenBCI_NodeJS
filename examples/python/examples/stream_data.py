import openbci_node2py as onp

stream = onp.Stream(port=3004, verbose=True)

stream.start()
