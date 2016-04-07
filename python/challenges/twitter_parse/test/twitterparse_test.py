import unittest
from urlparse import urlparse

from twitterparse.twitterparse import twitterparse, TwitterParseException


def handle_for(input):
    return twitterparse(input)[0].handle


class TwitterNameTest(unittest.TestCase):
    def test_from_handle(self):
        self.assertEqual('Gnusto', handle_for('Gnusto'))
        self.assertEqual('gnusto', handle_for('gnusto'))

    def test_from_good_url(self):
        self.assertEqual('nitfol', handle_for('https://twitter.com/nitfol'))
        self.assertEqual('Nitfol', handle_for('http://twitter.com/Nitfol'))
        self.assertEqual('nitfol', handle_for('twitter.com/nitfol'))

    def test_does_not_care_about_schemas(self):
        "The data are so messy that we'll go ahead and handle bad protocols for now."
        self.assertEqual('rezrov', handle_for('ftp://twitter.com/rezrov'))

    def test_from_twitter(self):
        "If a URL is given, it should be from Twitter. Case of the hostname is not important."
        self.assertEqual('bozbar', handle_for('https://Twitter.com/bozbar'))
        self.assertRaises(TwitterParseException, lambda: handle_for('https://google.com/'))

    def test_url_with_fragment_permissive(self):
        "Perhaps someone typed the URL in.  Default to permissive."
        self.assertEqual('Yomin', handle_for('http://twitter.com/#!/Yomin'))
        self.assertEqual('Yomin', handle_for('http://twitter.com/#!Yomin'))
        self.assertEqual('Yomin', handle_for('http://twitter.com/#Yomin'))

    def test_from_at_name(self):
        name = twitterparse('@Gnusto')[0]
        self.assertEqual('Gnusto',  name.handle)
        self.assertEqual('@Gnusto', name.at_name)

    def test_at_name_property(self):
        name = twitterparse('Gnusto')[0]
        self.assertEqual('Gnusto',  name.handle)
        self.assertEqual('@Gnusto', name.at_name)

    def test_canonical_url_string(self):
        """We assume that a proper Twitter url can be constructed by appending
        the handle to 'https://twitter.com/'.
        """
        name = twitterparse('Gnusto')[0]
        self.assertEqual('https://twitter.com/Gnusto', name.display_string)

    MULTIPLES = [
        '@Gnusto, @Rezrov',
        '@Gnusto,@Rezrov',
        '@Gnusto @Rezrov',
        '@Gnusto  @Rezrov',
        '@Gnusto; @Rezrov',
    ]

    def test_multiple_values(self):
        "When several values are provided in a list, provide an object for each."
        for input in self.MULTIPLES:
            names = twitterparse(input)
            self.assertEqual('Gnusto', names[0].handle, '{}'.format(input))
            self.assertEqual('Rezrov', names[1].handle, '{}'.format(input))

    CASES = [
        'gnusto',
        '@gnusto',
        ' twitter.com / gnusto',
        'twitter.com/@gnusto',
        'twitter.com/gnusto, rezrov',
        '#gnusto',
        '/twitter.com/gnusto',
        '@gnusto, @gnusto2',
        'Http://www.twitter.com/gnusto',
        'htt://twitter.com/gnusto',
        'httip://twitter.com/gnusto',
        'http://twitter.com/#!/gnusto',
        'http:twitter.com/gnusto',
        'http;//www.twitter.com/gnusto',
        'https://twitter.com/#!/gnusto',
        'gnusto@twitter.com',
        'twitter.com/ gnusto',
        'twitter.com/gnusto/',
        'www.twitter.com/#!/gnusto',
        'twitter.com/#%21/gnusto',
        'twitter.com/gnusto; https://twitter.com/rezrov',
        'http://twitter.com/gnusto/status/394931110536159232',
        'twitter.com/Twitter.com/gnusto',
        'http://twitter.com/gnusto, twitter.com/rezrov (new)',
        'http://twitter.com/gnusto.rezrov',
        'http://twitter.com.gnusto',
        'http://twiter.com/gnusto',
        'http://twitter.net/gnusto',
        'http://twitter/gnusto',
        'twttier.com/@gnusto',
        'www.twiiter.com/gnusto',
        'www.twiter.com/gnusto',
        'www.twitter/gnusto',
        'twitter.com.gnusto',
        'Http://www,twitter.com/gnusto',
        'twitter.comgnusto',
        'http://www.twitter/com/gnusto',
    ]

    def test_user_input_values(self):
        for schema in ('http', 'https', ''):
            for value in self.CASES:
                input = '{}://{}'.format(schema, value) if schema else value
                handle = handle_for(input)
                self.assertEqual(
                    'gnusto',
                    handle,
                    'unexpected result for "{}": "{}'.format(value, handle),
                )

    def test_failure_cases(self):
        self.assertRaises(TwitterParseException, lambda: twitterparse('https://twitter.com/'))
        self.assertRaises(TwitterParseException, lambda: twitterparse('https://twitter.com'))
        self.assertRaises(TwitterParseException, lambda: twitterparse('https://twitter'))
        self.assertRaises(TwitterParseException, lambda: twitterparse('https:twitter'))
        self.assertRaises(TwitterParseException, lambda: twitterparse('N/A'))

    def test_indirect_links(self):
        """It does not resolve bit.ly and similar links at this time, even if the link
        points to a valid Twitter url.
        """
        self.assertRaises(TwitterParseException, lambda: twitterparse('http://bit.ly/12345'))

    def test_unusual_cases(self):
        self.assertEqual('_gnusto_',      handle_for('https://twitter.com/#!/_gnusto_/'))
        self.assertEqual('_gnusto',       handle_for('@_gnusto'))
        self.assertEqual('gnusto_suffix', handle_for('@gnusto_suffix'))
        self.assertEqual('Gnusto',        handle_for('http://Twitter:   www.twitter.com/Gnusto'))
        self.assertEqual('g',             handle_for('http://twitter.com/g'))


if __name__ == '__main__':
    unittest.main()
