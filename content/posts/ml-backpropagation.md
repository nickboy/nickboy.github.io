---
title: "How Neural Networks Learn from Mistakes: Backpropagation Explained"
date: 2026-02-20
draft: false
tags: ["machine-learning", "study-notes", "georgia-tech"]
categories: ["Study Notes"]
description: "When a neural network gets an answer wrong, how does it figure out which internal connections to adjust? Backpropagation — the chain rule applied brilliantly — is the answer."
showTableOfContents: true
---

{{< lead >}}
When a factory produces a defective product, how do you trace the problem back through the assembly line to find which worker made the mistake? Neural networks face the exact same challenge. They have layers of "workers" (neurons), and when the final output is wrong, they need to figure out **who's responsible** — and by how much. The algorithm that solves this is called **backpropagation**, and it's the reason deep learning works at all.
{{< /lead >}}

## Neural Networks Are Everywhere

Before we dive into how neural networks *learn*, let's appreciate what they do. The phone in your pocket uses neural networks for face recognition, voice transcription, photo enhancement, and text prediction. Self-driving cars, medical image analysis, language translation — all neural networks.

But here's the thing: nobody *programs* these networks to do their jobs. Instead, we show them millions of examples and let them **learn from mistakes**. Backpropagation is the algorithm that makes this learning possible.

## The Factory Analogy

{{< katex >}}

Imagine a three-stage factory production line:

| Stage | Factory | Neural Network |
|-------|---------|---------------|
| **Stage 1** | Worker A processes raw materials | Input layer → Hidden layer (weights \\(w\\)) |
| **Stage 2** | Worker B assembles the product | Hidden layer → Output layer (weights \\(v\\)) |
| **Stage 3** | Quality inspector checks the result | Error calculation |

When the inspector finds a defect:

1. **First, ask Worker B** (closest to the output): "What went wrong in your assembly?" → The error is directly visible
2. **Then ask Worker A**: "How much of Worker B's problem traces back to your material processing?" → Blame is distributed proportionally

This is exactly how backpropagation works — it starts at the output and traces the error backward through the network, assigning "blame" to each connection along the way.

## The Network Structure

Let's work with a simple network: 2 inputs, 2 hidden neurons, 1 output.

{{< mermaid >}}
graph LR
    x1((x₁)) -->|w₁₁| h1((h₁))
    x1 -->|w₁₂| h2((h₂))
    x2((x₂)) -->|w₂₁| h1
    x2 -->|w₂₂| h2
    h1 -->|v₁| y((ŷ))
    h2 -->|v₂| y
{{< /mermaid >}}

Each arrow has a **weight** — a number that controls how strongly one neuron influences the next. Learning means finding the right weight values.

## Step 1: The Forward Pass (Making a Prediction)

Before we can learn from mistakes, we need to *make* a mistake. The forward pass pushes data through the network:

**Hidden layer** — each hidden neuron computes a weighted sum and passes it through an activation function \\(\sigma\\) (like the sigmoid function):

$$a_j = \sum_i w_{ij} \cdot x_i$$
$$h_j = \sigma(a_j) = \frac{1}{1 + e^{-a_j}}$$

**Output layer** — same process:

$$b = \sum_j v_j \cdot h_j$$
$$\hat{y} = \sigma(b)$$

**Error** — how wrong were we?

$$E = \frac{1}{2}(y - \hat{y})^2$$

Think of the forward pass as water flowing downstream: input → hidden → output → error. Simple, one-directional.

## Step 2: The Backward Pass (Assigning Blame)

Now the magic. We know the final error, but we need to figure out how to adjust *every single weight* in the network to reduce that error. We work backward.

### Output Layer: Direct Blame

The output layer error signal combines two things:

$$\delta_{out} = (y - \hat{y}) \cdot \sigma'(b)$$

- **\\((y - \hat{y})\\)**: How wrong is the prediction?
- **\\(\sigma'(b)\\)**: How sensitive is the output neuron to changes?

Think of it as: **"How wrong × How adjustable = How much to change"**

Then we update the output weights:

$$\Delta v_j = \eta \cdot \delta_{out} \cdot h_j$$

### Hidden Layer: Proportional Blame

Here's the core insight of backpropagation. Hidden neurons don't have their own "correct answer" — we only know the final output was wrong. So we distribute blame **proportionally to each connection's strength**:

$$\delta_j = \delta_{out} \cdot v_j \cdot \sigma'(a_j)$$

Breaking this down:

- **\\(\delta_{out}\\)**: The error signal from the output
- **\\(v_j\\)**: The weight connecting hidden neuron \\(j\\) to the output — **a stronger connection means more responsibility**
- **\\(\sigma'(a_j)\\)**: How sensitive is hidden neuron \\(j\\) to changes?

Then we update the hidden weights:

$$\Delta w_{ij} = \eta \cdot \delta_j \cdot x_i$$

### The Information Flow

{{< mermaid >}}
graph RL
    E["Error E"] -->|"(y-ŷ) · σ'(b)"| dout["δ_out"]
    dout -->|"× h_j"| dv["Update v weights"]
    dout -->|"× v_j · σ'(a_j)"| dh["δ_hidden"]
    dh -->|"× x_i"| dw["Update w weights"]
{{< /mermaid >}}

Error flows backward through the network. At each layer, it gets split and scaled according to the connection strengths. The chain rule from calculus is what makes this mathematically precise.

## The Chain Rule: Why It All Works

Backpropagation is really just the **chain rule** from calculus, applied cleverly. If you want to know how changing a weight \\(w\\) deep inside the network affects the final error \\(E\\), you multiply the local effects at each step:

$$\frac{\partial E}{\partial w} = \frac{\partial E}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial b} \cdot \frac{\partial b}{\partial h} \cdot \frac{\partial h}{\partial a} \cdot \frac{\partial a}{\partial w}$$

Each factor is a **local gradient** — how much one thing affects the next thing in line. Multiply them all together, and you know how the distant weight affects the final error.

It's like a chain of dominoes: knocking over the first one (changing \\(w\\)) causes a cascade that eventually reaches the last one (changing \\(E\\)). The chain rule tells you exactly how hard that last domino falls.

## A Concrete Example with Numbers

Let's run through a complete forward and backward pass.

**Setup**:
- Inputs: \\(x_1 = 0.5\\), \\(x_2 = 0.3\\)
- Hidden weights: \\(w_{11} = 0.4\\), \\(w_{21} = 0.2\\), \\(w_{12} = 0.3\\), \\(w_{22} = 0.5\\)
- Output weights: \\(v_1 = 0.6\\), \\(v_2 = 0.4\\)
- Target: \\(y = 1\\), Learning rate: \\(\eta = 0.5\\)

### Forward Pass

**Hidden neuron 1**:
$$a_1 = 0.4 \times 0.5 + 0.2 \times 0.3 = 0.26 \quad \Rightarrow \quad h_1 = \sigma(0.26) \approx 0.565$$

**Hidden neuron 2**:
$$a_2 = 0.3 \times 0.5 + 0.5 \times 0.3 = 0.30 \quad \Rightarrow \quad h_2 = \sigma(0.30) \approx 0.574$$

**Output**:
$$b = 0.6 \times 0.565 + 0.4 \times 0.574 = 0.569 \quad \Rightarrow \quad \hat{y} = \sigma(0.569) \approx 0.638$$

**Error**: \\(E = \frac{1}{2}(1 - 0.638)^2 \approx 0.065\\)

We predicted 0.638 but the target is 1. Time to learn!

### Backward Pass

**Output error signal**:
$$\delta_{out} = (1 - 0.638) \times 0.638 \times (1 - 0.638) \approx 0.083$$

**Output weight updates**:
$$\Delta v_1 = 0.5 \times 0.083 \times 0.565 \approx 0.024$$
$$\Delta v_2 = 0.5 \times 0.083 \times 0.574 \approx 0.024$$

**Hidden error signals** (this is where blame gets distributed):
$$\delta_1 = 0.083 \times 0.6 \times 0.565 \times (1 - 0.565) \approx 0.012$$
$$\delta_2 = 0.083 \times 0.4 \times 0.574 \times (1 - 0.574) \approx 0.008$$

Notice that \\(\delta_1 > \delta_2\\) because \\(v_1 = 0.6 > v_2 = 0.4\\) — the neuron with the stronger connection to the output gets more blame!

**Hidden weight updates**:
$$\Delta w_{11} = 0.5 \times 0.012 \times 0.5 \approx 0.003$$

### The Key Observation

| Weight | Update Size | Distance from Output |
|--------|------------|---------------------|
| \\(v\\) (output) | ~0.024 | 1 layer away |
| \\(w\\) (hidden) | ~0.003 | 2 layers away |

The updates are **10x smaller** for the hidden layer. Every layer the error travels through shrinks it further. This foreshadows a serious problem...

## The Vanishing Gradient Problem: A Game of Telephone

Remember the game of Telephone (Chinese Whispers)? A message gets distorted as it passes through more people. The same thing happens with error signals in deep networks.

The sigmoid function's derivative has a maximum value of just **0.25**. Every layer the error signal passes through, it gets multiplied by a number less than 0.25. In a deep network with many layers:

$$\text{Gradient} \propto \underbrace{0.25 \times 0.25 \times \cdots \times 0.25}_{N \text{ layers}}$$

For a 100-layer network: \\(0.5^{100} \approx 7.89 \times 10^{-31}\\)

That's essentially **zero**. The early layers receive virtually no error signal, so they can't learn at all. This is called the **vanishing gradient problem**, and it's why deep neural networks didn't work well for decades.

## Why Deep Learning Finally Worked (~2012)

The vanishing gradient problem was a show-stopper until researchers found clever solutions:

{{< timeline >}}

[2010]
**ReLU Activation** replaces Sigmoid.
Instead of squishing everything through the S-shaped sigmoid curve (max derivative 0.25), ReLU simply passes positive values through unchanged (derivative = 1). No more vanishing gradients.

[2015]
**Residual Connections (ResNets)** add "skip connections."
These create shortcuts that let the gradient flow directly to earlier layers, bypassing the shrinkage problem entirely. This enabled networks with 100+ layers.

[2015]
**Batch Normalization** stabilizes training.
By normalizing the inputs to each layer, it prevents the gradients from getting too large or too small, keeping everything in a healthy range.

{{< /timeline >}}

These breakthroughs (along with powerful GPUs and massive datasets) are why deep learning exploded in the 2010s and now powers everything from language models to image generators.

## Key Takeaways

1. **Backpropagation** distributes blame for errors backward through a network, so every weight knows how to adjust
2. It works by applying the **chain rule** — multiplying local gradients at each layer
3. Weights with **stronger connections** get more blame (and bigger updates)
4. The **vanishing gradient** problem caused error signals to shrink to nothing in deep networks
5. Modern fixes like **ReLU**, **residual connections**, and **batch normalization** solved this, enabling the deep learning revolution

{{< alert "graduation-cap" >}}
**Study Notes**: This post is based on my personal notes from studying Machine Learning (CS7641) at Georgia Institute of Technology. The concepts are explained in my own words for learning purposes.
{{< /alert >}}
