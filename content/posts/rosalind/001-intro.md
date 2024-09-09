+++ 
draft = true
date = 2024-08-18T20:46:15-07:00
title = "ROSALIND Series #01 - Intro + DNA"
description = "What is ROSALIND? Why we solving problems off of it (in Go, no less!)? Come find out as we solve the first problem in the series!"
tags = ["bioinformatics", "go"]
categories = ["tutorials"]
series = ["rosalind"]
+++

## Introduction

Lately I've found myself with far too much time on my hands and the need to pick up a new better hobby. What better to do than blog!

In this series, we'll be working through problems from [rosalind.info](https://rosalind.info), a collection of bioinformatics practice problems. For no reason in particular other than a recent obsession with the language gained during my time as an intern at Google, we will be solving these problems in [Go](https://go.dev/).

I'll do my best to introduce the basics of the syntax in the first few posts in the series, but I still highly recommend you work through [A Tour of Go](https://go.dev/tour/welcome/1) to get familiar with the language. I'll also try my best to explain biology concepts as they come up, but will assume that you have some familiarty with the basics of the central dogma, what DNA/RNA/proteins are, etc.

Why don't we dive right in and take a crack at the first problem in the series!

## Problem: [Counting DNA Nucleotides](https://rosalind.info/problems/dna/)

This problem asks us to take a DNA sequence encoded as a string (i.e. an ordered sequence of characters) and count the occurrence of each of the four nucleotides: "A" (adenine), "T" (thymine), "G" (guanine), and "C" (cytosine).

Aside from being an easy exercise to get us acquainted with some basic Go syntax, knowing the relative composition of a DNA sequence can be pretty useful! Different regions of DNA will have different densities of each nucleotide.

As a reminder, DNA is a *double* helix, so each nucloetide we read in a sequence is paired to its complement: A with T, and G with C. These two pairings have different strengths, as the A-T pair involves two hydrogen bonds compared to the G-C pair's three hydrogen bonds. As such,regions of DNA with a higher GC content will be harder to pull apart! This has all kinds of implications, but let's set those aside for now to solve the problem.

## Solution

Our solution will primarily consist of a single function, `CountNucleotides()`.

This function will take in a DNA sequence (represented as a `string`) and output a `map` between each nucleotide (represented as a `rune`, which is how Go stores Unicode characters) and how many times it appeared in the sequence (represented as an `int`). This leaves us with a function signature that looks like so:

```go
func CountNucleotides(sequence string) map[rune]int {
    // TODO: Implement this
}
```

We can start out by initializing a `map` in which to store how many nucleotides we find with a value of 0 for each:

```go
res := map[rune]int{
    'A': 0,
    'T': 0,
    'G': 0,
    'C': 0,
}
```

Now, let's just loop over the entries of the `sequence` we were provided and increment the count of the nucleotide we find:

```go
for _, base := range sequence {
    res[base] = res[base] + 1
}
```

The complete function looks like this:

```go

```