"""
Task: expose a helper function called `twitterparse` that can be used
for cleaning up Twitter URLs and handles.  The return value is a list
of one or more objects, each of which represents a Twitter handle, exposing
various convenience properties related to that handle.

First, get all of the specs to pass:

    $ NOSE_WHERE=. nosetests test.twitterparse_test
    .............
    ----------------------------------------------------------------------
    Ran 13 tests in 0.007s

    OK
    $

Next, get the file to run on the command line, accepting a file of arbitrary
newline-delimited input:

    $ python -m twitterparse.twitterparse < twitter.txt
    https://twitter.com/gnusto                         -> gnusto
    http://www.twitter.com/rezrov                      -> rezrov
    http://twitter.com/#!/frotz                        -> frotz
    http://@nitfol                                     -> nitfol
    http://yomin@twitter.com                           -> yomin
    ...
    $

"""
import fileinput
import re

def twitterparse_item(item):
    """
    Parses a string and attempts to return a TwitterHandler object
    """
    if item == 'N/A':
        raise TwitterParseException

    # Strip away extraneous information
    schemes = r'http://|https://|ftp://'
    item = re.sub(schemes, '', item, re.IGNORECASE)
    item = re.sub('@twitter.com', '', item, re.IGNORECASE)
    item = re.sub('/status/.+', '', item, re.IGNORECASE)

    TWITTER_HOSTS = r'twitter|twiter|twttier|twiiter'

    # If twitter host is present, extract handle from uri path.
    # Handle user typos as well
    if re.search(TWITTER_HOSTS, item, re.IGNORECASE):
        item = re.sub(TWITTER_HOSTS, 'twitter', item, re.IGNORECASE)

        # 'twitter.com/gnusto/' -> 'twitter.com/gnusto'
        item = re.sub(r'/$', '', item)

        # 'twitter.com.gnusto' -> 'twitter.com/gnust'
        item = re.sub(r'com\.', 'com/', item, re.IGNORECASE)

        # 'twitter.comgnusto' -> 'twitter.com/gnusto'
        item = re.sub(r'twitter.com(?!/)', 'twitter.com/', item)

        try:
            item = item.rsplit('/', 1)[1]
        except:
            raise TwitterParseException
    else:
        # Only hosts from twitter are allowed.
        # Assume a different host was provided if a '/' is present.
        if re.search(r'/', item, re.IGNORECASE):
            raise TwitterParseException

    # Raise exception if nothing to parse after all processing
    if item == '':
        raise TwitterParseException

    return TwitterHandler.factory(item)

def twitterparse(s):
    """
    Parses a delimited set of strings.
    Returns a list of TwitterHandler objects
    """
    s = ' '.join(s.split())
    objs = []
    DELIMITERS = ', |,@|; | @|'  # Note: order matters!
    items = re.split(DELIMITERS, s)
    for item in items:
        objs.append(twitterparse_item(item))
    return objs

class TwitterHandler(object):
    """ Object representing parsed twitter handlers """
    def __init__(self, handle, at_name, display_string):
        self.handle = handle
        self.at_name = at_name
        self.display_string = display_string

    @staticmethod
    def factory(handle):
        """ Creates a TwitterHandler from a user's twitter hander """
        PERMISSIVE_CHARS = '[#!/@\s]'
        handle = re.sub(PERMISSIVE_CHARS, '', handle)
        # 'gnusto.rezrov' -> 'gnusto'
        if '.' in handle:
            handle = handle.split('.')[0]
        at_name = '@' + handle
        display_string = 'https://twitter.com/' + handle

        return TwitterHandler(handle, at_name, display_string)

class TwitterParseException(Exception):
    """ Generic exception for twitterpase failures """
    pass

if __name__ == '__main__':
    lines = (l.strip() for l in fileinput.input())
    for line in lines:
        try:
            objs = twitterparse(line)
            handles = ', '.join(o.handle for o in objs)
        except TwitterParseException as e:
            handles = '<exception>'
        print '{:50} -> {}'.format(line, handles)
