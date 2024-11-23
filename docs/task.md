# The challenge

In this challenge, you will build a web app to execute a minimal declarative language, which defines the tasks in a workflow.

You will build the backend system to execute the tasks, along with a web frontend to show the results. You can use any language and frameworks that you want, and this is an open-book test.

## Details

We’ll start with some simple examples and build up the complexity from there.
It’s not expected that you will finish this challenge – it is deliberately bigger than the time allowance to see how you make tradeoffs.
We will assess this based on correctness, code quality, and completeness.
This doesn’t need to be production-level code, but we learn less about candidates from very hacky prototypes.
You might like to keep track of how you spend your time, as we find it helpful to build a richer picture of your work.

### Step 0
Build an app which shows the user a button on a web page.

When the user clicks the button, the backend server should execute the following workflow (semantics detailed below):

```json
  {
    "entry_point": "hello_world",
    "tasks": {
      "hello_world": {
        "output": "hello world!"
      }
    }
  }
```

After the workflow has completed, the web page should show the text “hello world!” next to the button.
About the declarative language
- The language is JSON-encoded.
- The `entry_point` attribute specifies which task’s output is to be returned.
- The tasks object represents the parts of a workflow – in the above example, there’s only one.

### Step 1
Extend your app to show a second button on the page. When the user clicks this button, execute this workflow:

```json
  {
    "entry_point": "hello_name",
    "tasks": {
      "name": {
        "output": "Alan"
      },
      "hello_name": {
        "output": "hello ${name}!"
      }
    }
  }
```

When the workflow completes, the web page should show “hello Alan!” next to the button.

#### New language feature!

The `${name}` syntax indicates your executor should run the task called name and substitute its result into the string.

### Step 2
Extend your app with a third button. This time there should also be a text input field next to the button. When the user clicks the button, run this workflow:

```json
  {
    "entry_point": "hello_input",
    "tasks": {
      "hello_input": {
        "output": "hello @{name}!"
      }
    }
  }
```

When it completes, if the user has entered “Alonzo” in the text field then the web page should show “hello Alonzo!”.

#### New language feature!

The `@{input}` syntax indicates that the frontend has passed a parameter to your backend, with the key input. Your executor should retrieve this parameter and substitute its value into the string.

### Step 3
Add a fourth button. When clicked, the button should enter a disabled state. When the backend execution completes, the result should be shown next to the button and the button becomes enabled again. Here’s the workflow:

```json
  {
    "entry_point": "slow_goodbye",
    "tasks": {
      "slow_goodbye": {
        "steps": [
          {
            "wait": 5
          }
        ],
        "output": "goodbye!"
      }
    }
  }
```

#### New language feature!
The steps key is a list of actions your backend should perform before producing the output.
In this case, the wait step means the execution pauses for 5 seconds.

### Step 4
Add another button. As before, when clicked the button should enter a disabled state. When the backend execution completes, the result should be shown next to the button and the button becomes enabled again. Here’s the workflow:

```json
  {
    "entry_point": "join",
    "tasks": {
      "slow_goodbye": {
        "steps": [
          {
            "wait": 5
          }
        ],
        "output": "goodbye"
      },
      "slow_name": {
        "steps": [
          {
            "wait": 5
          }
        ],
        "output": "Ada"
      },
      "join": {
        "output": "${slow_goodbye} ${slow_name}!"
      }
    }
  }
```

Note: the result (“goodbye Ada!”) should appear next to the button in about 5 seconds. In other words, you need to run slow_goodbye and slow_name concurrently.

### Step 5
Our page is getting quite hectic with all the buttons and text fields.

Change the layout of the page such that the user can select the workflow they want to run from a dropdown menu. There should be a single “Execute workflow” button, and – iff necessary – a text field for user input.

### Step 6
Add another workflow to your page, which includes a text input named name. Here’s the workflow it should run:

```json
  {
    "entry_point": "name_classifier",
    "tasks": {
      "name_is_long_or_short": {
        "steps": [
          {
            "length": "@{name}"
          },
          {
            "gt": [
              "${0}",
              7
            ]
          },
          {
            "if": {
              "condition": "${0}",
              "true": "long name",
              "false": "short name"
            }
          }
        ]
      },
      "name_classifier": {
        "output": "@{name} is a ${name_is_long_or_short}"
      }
    }
  }
```

If you enter “Harold” in the text field, the result should be “Harold is a short name”; if you enter “Margaret” in the text field, the result should be “Margaret is a long name”.

#### New language features!
- If no output key is given for a task, the result of the task is the result of its final step.
- The length step returns the length of its argument.
- The special `${0}` variable indicates the result of the previous step. It’s not valid to use this variable in the first step of a task.
- The gt step returns a boolean indicating if its first argument is strictly greater than its second.
- An if step evaluates the boolean in its condition argument and returns its true argument if it is truthy, otherwise its false argument.

### Step 7

Implement debug-mode for your workflow executor. This means that – in addition to the workflow result – all intermediate results from all the tasks and their steps are shown in a separate section on the page when the workflow completes.

For example, the page should look something like this after running the workflow from Step 1.

Result: hello Alan!

Debug:

```json
{ "task": "name", "step": "output", "result": "Alan" }
{ "task": "hello_name", "step": "output", "result": "hello Alan!" }
```

The output from Step 6 might look something like:

Result: Margaret is a long name

Debug:
```json
{ "task": "name_is_long_or_short", "step": 0, "result": 8 },
{ "task": "name_is_long_or_short", "step": 1, "result": true },
{ "task": "name_is_long_or_short", "step": 2, "result": "long name" },
{ "task": "name_classifier", "step": "output", "result": "Margaret is a long name" }
```

The formatting isn’t crucial (the above examples use JSONL), but it’s important that the user sees the tasks and steps listed in the order that they’re executed.

### Step 8
As workflows get more complex, they will sometimes run for several seconds – or even minutes.

This can lead to a bad user experience because the interface doesn’t show anything useful until the whole workflow is complete.

Using the debug output you implemented in Step 7, stream intermediate results to the user’s browser so that they see the tasks and steps executed before the final result appears.

### Step 9
Make the UI look nice.

### Step 10
What additional features would be most useful in the declarative language?

What order would you implement these in, and why?

Implement the top priority as your own additional language feature.
