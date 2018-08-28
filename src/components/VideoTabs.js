import React from 'react'
import { rhythm, scale } from '../utils/typography'
import Link from 'gatsby-link'
import Disqus from 'disqus-react'

class VideoTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'code',
    }
  }

  onTab = active => {
    this.setState({ active: active })
  }

  render() {
    return (
      <div>
        <nav className="nav nav-pills nav-fill mb-4">
          <a
            className={`nav-item nav-link ${
              this.state.active == 'code' ? 'active' : ''
            }`}
            onClick={() => this.onTab('code')}
            href="#code"
          >
            Code
          </a>
          <a
            className={`nav-item nav-link ${
              this.state.active == 'discuss' ? 'active' : ''
            }`}
            onClick={() => this.onTab('discuss')}
            href="#discuss"
          >
            Discuss
          </a>
          <a
            className={`nav-item nav-link ${
              this.state.active == 'transcript' ? 'active' : ''
            }`}
            href="#transcript"
            onClick={() => this.onTab('transcript')}
          >
            Transcript
          </a>
        </nav>
        <div className={`${this.state.active == 'code' ? '' : 'd-none'}`}>
          <iframe
            height="600px"
            width="100%"
            src="https://repl.it/@cameronmaske/How-To-Mock-Patch-A-Function-Testing-Python-With-Pytest?lite=true"
            scrolling="no"
            frameborder="no"
            allowtransparency="true"
            allowfullscreen="true"
            sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
          />
        </div>
        <div className={`${this.state.active == 'discuss' ? '' : 'd-none'}`}>
          <Disqus.DiscussionEmbed
            shortname={'cameronmaske'}
            config={{
              //   url: siteUrl + this.props.location.pathname,
              title: 'todo',
            }}
          />
        </div>
        <div className={`${this.state.active == 'transcript' ? '' : 'd-none'}`}>
          <div>
            0:00 - Let's get rid of the randomness in this test by mocking it
            out. <br />
            0:20 - Let's start off by importing mock that has been built into
            Python since version 3.3.
            <br />
            0: 30 - If you are Python 2, however, you'll need to install it as a
            separate package.
            <br />
            Next, let's point mock to the function we want to override or patch,
            in this case our random integer function.
            <br />
            Let's set it to always return a value of 5 and let's tell mock to
            autospec that function And we'll see why that's important in a bit.
            <br />
            Let's include an argument in our test function to grab that mock
            object.
            <br />
            Let's run the test.... and it passes.
            <br />
            So there can be a few common gotchas that can trip you up when
            mocking.
            <br />
            When specifiying the path to what you wanna patch you need to take
            care to point it is being used, but not where it's defined. <br />
            Let's see that in action and point to the random module or where it
            is defined. And we can see that our tests failed because it's not
            being mocked anymore. <br />
            Speccing makes sure that anything mock tries to mimic it's original
            a bit more closely. We can see that in action by turning off
            autospecc'ing and let's add some nonsense to the argument in our
            random integer function. <br />
            And now when we run our tests they pass and that's because an
            unspecced mock will literally take anything you throw at it.
          </div>
        </div>
      </div>
    )
  }
}

export default VideoTabs
