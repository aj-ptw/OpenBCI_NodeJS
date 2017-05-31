import json
import sys
import numpy as np
import time
import zmq

class Interface:
    def __init__(self, port=3000, verbose=False):
        context = zmq.Context()
        self._socket = context.socket(zmq.PAIR)
        self._socket.connect("tcp://localhost:" + str(port))

        self.verbose = verbose

        if self.verbose:
            print "Client Ready!"

        # Send a quick message to tell node process we are up and running
        self.send(json.dumps({
            'action': 'started',
            'command': 'status',
            'message': time.time()*1000.0
        }))

    def send(self, msg):
        """
        Sends a message to TCP server
        :param msg: str
            A string to send to node TCP server, could be a JSON dumps...
        :return: None
        """
        if self.verbose:
            print '<- out ' + msg
        self._socket.send(msg)
        return

    def recv(self):
        """
        Checks the ZeroMQ for data
        :return: str
            String of data
        """
        return self._socket.recv()


class RingBuffer(np.ndarray):
    """A multidimensional ring buffer."""

    def __new__(cls, input_array):
        obj = np.asarray(input_array).view(cls)
        return obj

    def __array_finalize__(self, obj):
        if obj is None:
            return

    def __array_wrap__(self, out_arr, context=None):
        return np.ndarray.__array_wrap__(self, out_arr, context)

    def append(self, x):
        """Adds element x to the ring buffer."""
        x = np.asarray(x)
        self[:, :-1] = self[:, 1:]
        self[:, -1] = x

class Stream:
    """
    """
    def __init__(self, port=3000, buffer_size=2500, nb_chans=8, verbose=False):

        # port
        self.port = port

        #  size
        self.buffer_size = buffer_size

        #cCreate a new python interface.
        self.interface = Interface(verbose=verbose)

        self.signal = RingBuffer(np.zeros((nb_chans + 1, buffer_size)))

        self.start = self.start

    def start(self):

        while True:
            msg = self.interface.recv()
            try:
                dicty = json.loads(msg)
                action = dicty.get('action')
                command = dicty.get('command')
                message = dicty.get('message')

                if command == 'sample':
                    if action == 'process':
                        # Do sample processing here
                        try:
                            if type(message) is not dict:
                                print "sample is not a dict", message
                                raise ValueError
                            # Get keys of sample
                            data = np.zeros(9)

                            data[:-1] = message.get('channelData')
                            data[-1] = message.get('timeStamp')

                            # Add data to end of ring buffer
                            self.signal.append(data)

                            print(data)
                            print message.get('sampleNumber', data)

                        except ValueError as e:
                            print e
                elif command == 'status':
                    if action == 'active':
                        interface.send(json.dumps({
                            'action': 'alive',
                            'command': 'status',
                            'message': time.time() * 1000.0
                        }))

            except BaseException as e:
                print e
