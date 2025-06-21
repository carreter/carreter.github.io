---
date: "2025-06-21T14:00:16-07:00"
draft: true
title: "Fibonacci sequences, GC content, and Hamming distances (oh my)!"
description: "Next up in the ROSALIND series: recursion, a FASTA parser, and some thoughts on future directions."
series:
    - rosalind
tags:
    - go
    - bioinformatics
params:
    seriesentry: 3
---

## Personal updates and future direction for the series

Hey all! Now that I've settled into my new position as a software engineer on
[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) working on
scalable GPU/[TPU](https://en.wikipedia.org/wiki/Tensor_Processing_Unit) compute for
ML/AI training applications, I figured it'd be good to keep my bioinformatics/computational
biology skills sharp by resuming this series.

We're still pretty early on in the [ROSALIND problem tree](https://rosalind.info/problems/tree-view/), so the exercises are not too hard. As such, I'll be fitting a few problems
into this post and place an extra emphasis on writing idiomatic and performant Go.

Most of the Kubernetes infrastructure I'll be working on at Google (e.g. some open-source
contributions to [JobSet](https://github.com/kubernetes-sigs/jobset)) will be in Go,
I will likely write parts of this series in other languages going forward. I've created
a little [poll](https://strawpoll.com/PKglej37QZp) to see if  my readers have any preference(s).
[Julia](https://julialang.org/) has definitely caught my eye lately, so expect to see a post
using that soon.

Now let's get to it and solve some problems! Don't forget to check the [GitHub repo](https://github.com/carreter/rosalind-solutions) for full solutions if you get stuck.

## Problem 4: [Rabbits and Recurrence Relations](https://rosalind.info/problems/fib/)

The problem description gives an excellent overview of recurrence relations, so I won't
repeat it here. In short, we're being asked to do the following:

> **Given:** Positive integers \(n \leq 40\) and \(k \leq 5\)
>
> **Return:** The total number of rabbit pairs that will be present after \(n\) months,
> if we begin with 1 pair and in each generation, every pair of reproduction-age rabbits
> produces a litter of \(k\) rabbit pairs (instead of only 1 pair).

Let's try and describe this in mathematical notation, with \(F(n)\) representing the population
of rabbits (in _pairs!_) after \(n\) months.

We begin with 1 pair, so \( F(0) = F(1) = 1. \)
In this case, rabbits reach reproductive age after
1 month; this means that on month \(n\) all rabbit pairs that were already alive at month
\(n-2\) will each produce \(k\) pairs of offspring, which get added to the previous month's
population. This lets us write the recurrence relation \[ F(n) = F(n-1) + F(n-2). \]

### Naive solution

Once you have a recurrence relation and its base case written down, it's fairly straightforward
to implement it in code. Here's what this would look like in Go:

```go
func Fibonacci(n int, k int) int {
    // Base case: we start with 1 pair of rabbits that
    // take a month to start reproducing.
    if n == 0 || n == 1 {
        return 1
    }
    
    // Recursive step: each pair of rabbits alive 2 months
    // ago produce k offspring, which we add to last month's
    // population.
    return k * Fibonacci(n-2, k) + Fibonacci(n-1, k)
}
```

This naive solution, while quite straightforward to implement, has a significant weakness:
it performs quite poorly as \(n\) gets larger! Each recursive step makes two function
calls, which in turn make two function calls, resulting in an exponential explosion that
leaves us with a shockingly poor [runtime complexity](https://en.wikipedia.org/wiki/Computational_complexity_theory) of \(O\left(2^n\right)\).

### Dynamic programming solution

Let's take a different approach: instead of recursing *downward*, splitting the problem
into smaller and smaller chunks, let's iterate *upward* by starting from a simple case and
progressively build a solution (i.e.: use [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming)).

To apply dynamic programming here, we're going to need to declare a slice `population`, where
we will store the population after month \(n\) at the corresponding index. We know that
for the first two months we only have 1 pair, so we can initialize `population` with those values:
```go
population := []int{1, 1}
```

The problem at hand is now to take a `population` slice of length `n` and append the next month's population to it. Luckily, we have a recurrence relation that tells us exactly how
to do this: just add the previous two months' populations together!

```go
population = append(
    population,
    population[len(population)-1] + population[len(population-2)]
)
```