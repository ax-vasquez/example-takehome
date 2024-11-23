# elicit-takehome

Take-home assignment for Elicit.

To test this application, start in the root of this repository, then:
1. Open a terminal tab > run `yarn` to install dependencies
1. Run `yarn start-api`
1. Open a second terminal tab > run `yarn start-web`
1. Navigate to http://localhost:3000 to test out the various workflows

## About my implementation

I ran out of time (timeboxed to 6 hours), but am overall happy with the implementation because it addresses the core functionality of the 
example application. My aim was to make sure my implementation at least addressed the core functionality, in pursuit of the "make it work,
then make it right" mentality.

The logic has only been tested with the provided examples, so it's possible (even likely) that variations on these workflows could potentially
have a slight bug in the logic. With that being said, without a clear specification on all the things a Workflow can do, it didn't make a lot
of sense to start planning for things that haven't been scoped out, yet. My aim with only targeting the base test cases was to achieve an "MVP"
of the application that can be further iterated on for improvements.
