+++
title = "ROSALIND Series #02 - DNA to RNA + Reverse Complement"
date = 2024-09-28T18:29:45-04:00
description = "Let's implement two extremely common utilities in bioinformatics: transcribing DNA to RNA and taking the reverse complement of a sequence."
draft = true
tags = ["bioinformatics", "go"]
categories = ["tutorials"]
series = ["rosalind"]
+++

## Introduction

Welcome to the second entry in the ROSALIND problem series! Today we will be solving two problems: transcribing DNA to RNA and taking the reverse complement of a DNA sequence. This will let us learn some basics of efficient string manipulation in Go.

As always, solutions are in the associated [GitHub repo](TODO).

## Problem 1: [Transcribing DNA into RNA](https://rosalind.info/problems/rna/)

[Transcription](https://en.wikipedia.org/wiki/Transcription_(biology)) is a core biological process which allows genetic information stored in double-stranded DNA to be copied into single-stranded RNA. This RNA can then serve as a message that is read by ribosomes during [translation](https://en.wikipedia.org/wiki/Translation_(biology)) in order to produce a protein. RNA has many other cellular functions, but let's focus on the task at hand!

## Solution 1

When a DNA sequence is transcribed into RNA, it remains identical except for the substition of all Ts (thymine) with Us (uracil). This should be pretty easy to implement! Let's start with a function signature which takes a `string` representing our DNA sequence and outputs a `string` representing the corresponding RNA sequence:

```go
func DNAToRNA(sequence string) string {
    // TODO: Implement this
}
```

We could from here simply iterate over the bases in `sequence` and append the RNA version of the base to a string that we then return:

```go
func DNAToRNA(sequence string) string {
    result := ""

    for _, base := range sequence {
        // Replace Ts with Us. Otherwise, simply copy over the base.
        if base == 'T' {
            result += "U"
        } else {
            result += string(base) // Convert base from a rune to a string before appending.
        }
    }

    return result
}
```

However, this would be very inefficient! In Go, the `string` type is immutable and *cannot be changed*. This means that we are creating a new `string` every time we add a base to our result, which involves a lot of unnecessary writing and rewriting of data.

That's where the `strings` package comes in to the rescue by providing us with the handy [`strings.Builder`](https://pkg.go.dev/strings#Builder) type, which allows us to efficiently build a string bit by bit. Let's rewrite our function to use it!

First, we'll want to import the `strings` module. The beginning of your Go file should look like this:

```go
package main

import (
    "fmt"
    "os"
    "strings"
)
```

Then, within our `DNAToRNA()` function, we'll first want to initialize an empty builder:

```go
builder := strings.Builder{}
```

The rest of the code will look very similar, except for two changes: (1) we will call `builder.WriteRune()` instead of appending to our result string, and (2) we will call `builder.String()` at the end of the function to build the final sequence.

Let's give it a shot:

``` go
func DNAToRNA(sequence string) string {
	// Initialize a builder to store the result in.
	builder := strings.Builder{}

	// Iterate over the sequence, replacing Ts with Us.
	for _, base := range sequence {
		if base == 'T' {
			builder.WriteRune('U')
		} else {
			builder.WriteRune(base)
		}
	}

	return builder.String()
}
```

And that's it! You can use similar code to what is described in the first entry in this series to read in the dataset and output the result.

