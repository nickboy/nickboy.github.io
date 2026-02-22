---
title: "How Machines Ask Smart Questions: Entropy & Information Gain"
date: 2026-02-20
draft: false
tags: ["machine-learning", "study-notes", "georgia-tech"]
categories: ["Study Notes"]
description: "Ever played 20 Questions? Decision trees use the same strategy — asking the smartest possible question each time. Learn how entropy and information gain make this work."
showTableOfContents: true
---

{{< lead >}}
Imagine you're playing **20 Questions**. You're trying to guess what animal your friend is thinking of. Would you start with "Is it a golden retriever?" or "Does it live in water?" The second question is obviously smarter — it eliminates roughly half the possibilities in one shot. Decision trees in machine learning work exactly the same way, and they use **entropy** and **information gain** to figure out what the smartest question is.
{{< /lead >}}

## What's the Big Idea?

When a machine learning algorithm builds a {{< badge >}}Decision Tree{{< /badge >}}, it needs to decide which question to ask first. Should it split the data by color? By size? By temperature? The answer comes from a beautifully simple concept: **ask the question that reduces uncertainty the most**.

But to measure "uncertainty," we need a number for it. That number is called **entropy**.

## Entropy: Measuring Chaos

### The Messy Room Analogy

Think of entropy as a **messiness score**:

| Situation | Entropy | Why |
|-----------|---------|-----|
| All your clothes are folded in the closet | Low | You know exactly where everything is |
| Clothes are scattered everywhere | High | You have no idea where anything is |

In machine learning, "messiness" means **how mixed up the categories are** in your data.

### The Marble Bag

Imagine reaching into a bag of marbles without looking:

- **Bag A**: All red marbles → Entropy = **0** (you *know* what you'll grab)
- **Bag B**: Half red, half blue → Entropy = **1** (maximum uncertainty — it's a coin flip)
- **Bag C**: All blue marbles → Entropy = **0** (certain again)

The more mixed up the bag is, the higher the entropy. When everything is the same, entropy is zero — there's no surprise.

### The Math (It's Simpler Than It Looks)

{{< katex >}}

For a dataset \\(S\\) with multiple classes, entropy is:

$$Entropy(S) = -\sum_{i=1}^{c} p_i \log_2(p_i)$$

Where \\(p_i\\) is the proportion of class \\(i\\) in the dataset, and \\(c\\) is the number of classes.

For the simple case of two classes (yes/no, spam/not-spam):

$$Entropy(S) = -p_+ \log_2(p_+) - p_- \log_2(p_-)$$

**Let's plug in numbers for the marble bags:**

- **Bag A** (all red): \\(Entropy = -1 \times \log_2(1) - 0 \times \log_2(0) = 0\\)
- **Bag B** (half and half): \\(Entropy = -0.5 \times \log_2(0.5) - 0.5 \times \log_2(0.5) = 1\\)

The entropy curve looks like a hill — it peaks at 0.5 (maximum confusion) and drops to zero at the extremes (total certainty).

{{< alert >}}
**Why log base 2?** Because entropy is measured in **bits** — the same bits as in computer science. An entropy of 1 bit means you need exactly one yes/no question to figure out the answer. This connects directly to the "20 Questions" game!
{{< /alert >}}

## Information Gain: Picking the Best Question

Now for the punchline. **Information gain** measures how much a particular question *reduces* entropy:

$$Gain(S, A) = Entropy(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} \times Entropy(S_v)$$

In plain English: **Information Gain = Entropy before asking − Entropy after asking**

A bigger information gain means a better question.

## Worked Example: Should I Play Tennis?

Let's say you have 8 days of data about whether you played tennis:

- **5 days** you played (✅)
- **3 days** you didn't (❌)

Starting entropy:

$$Entropy = -\frac{5}{8}\log_2\frac{5}{8} - \frac{3}{8}\log_2\frac{3}{8} \approx 0.954$$

Now let's compare two possible questions:

### Question 1: "What's the weather?"

{{< mermaid >}}
graph TD
    A["All Data<br/>5✅ 3❌<br/>Entropy = 0.954"] -->|Sunny| B["2✅ 1❌<br/>Entropy = 0.918"]
    A -->|Overcast| C["2✅ 0❌<br/>Entropy = 0"]
    A -->|Rainy| D["1✅ 2❌<br/>Entropy = 0.918"]
{{< /mermaid >}}

Weighted entropy after splitting by weather:

$$\frac{3}{8} \times 0.918 + \frac{2}{8} \times 0 + \frac{3}{8} \times 0.918 = 0.689$$

**Information Gain = 0.954 − 0.689 = 0.265**

### Question 2: "Is it windy?"

{{< mermaid >}}
graph TD
    A["All Data<br/>5✅ 3❌<br/>Entropy = 0.954"] -->|Light Wind| B["4✅ 1❌<br/>Entropy = 0.722"]
    A -->|Strong Wind| C["1✅ 2❌<br/>Entropy = 0.918"]
{{< /mermaid >}}

Weighted entropy after splitting by wind:

$$\frac{5}{8} \times 0.722 + \frac{3}{8} \times 0.918 = 0.795$$

**Information Gain = 0.954 − 0.795 = 0.159**

### The Verdict

| Attribute | Information Gain | Winner? |
|-----------|-----------------|---------|
| Weather | **0.265** | ✅ Pick this one! |
| Wind | 0.159 | |

**Weather** gives more information gain, so the decision tree puts it at the top. It's the smarter first question — just like in 20 Questions.

### What a Good Split Looks Like

{{< mermaid >}}
graph LR
    A["Mixed Data<br/>High Entropy"] -->|Good Split| B["Mostly ✅<br/>Low Entropy"]
    A -->|Good Split| C["Mostly ❌<br/>Low Entropy"]
{{< /mermaid >}}

A good split takes a messy group and separates it into *purer* groups. A bad split leaves you with groups that are still mixed up — you haven't learned much.

## Real-World Applications

This isn't just a classroom exercise. Decision trees powered by entropy and information gain are used everywhere:

- **Spam filtering**: "Does the email contain the word 'lottery'?" splits your inbox into much purer groups than "Was it sent on a Tuesday?"
- **Medical diagnosis**: A doctor's diagnostic flowchart is essentially a decision tree — "Does the patient have a fever?" is a high-information-gain question for many conditions
- **Recommendation systems**: Streaming services split users into groups based on features that best predict what they'll watch next
- **Credit scoring**: Banks use decision trees to determine which factors best separate reliable borrowers from risky ones

## Key Takeaways

1. **Entropy** measures how mixed up (uncertain) a dataset is — from 0 (pure) to 1 (maximum chaos for two classes)
2. **Information gain** tells you how much a question reduces that chaos
3. Decision trees are greedy — they always pick the question with the **highest information gain** first
4. This is exactly the strategy of a smart 20 Questions player: ask the question that eliminates the most possibilities

{{< alert "graduation-cap" >}}
**Study Notes**: This post is based on my personal notes from studying Machine Learning (CS7641) at Georgia Institute of Technology. The concepts are explained in my own words for learning purposes.
{{< /alert >}}
