---
title: "Case Study: Building AWS Billing's Unbilled Usage Auditor"
date: 2026-02-22
draft: false
tags: ["distributed-systems", "aws", "case-study", "billing"]
categories: ["AI & Productivity"]
description: "How I designed a system that reduced AWS billing charge discrepancies by 300x (from $125,000 to $432) while cutting 230 million monthly false positives."
showTableOfContents: true
---

{{< lead >}}
I spent five years on the AWS Billing team. The hardest problem I tackled was detecting when customers used AWS services but weren't charged correctly. This post walks through how I designed a system that reduced charge discrepancies by **300x** and eliminated **230 million** monthly false positives.
{{< /lead >}}

## The Problem

AWS billing is trickier than it looks. When a customer launches an EC2 instance, writes to S3, or queries DynamoDB, each action generates a usage record. These records flow through a pipeline that calculates charges based on the customer's pricing plan, region, and service tier.

Sometimes, usage records don't make it through the pipeline correctly. A record might get dropped, delayed, or processed with the wrong pricing. The customer gets under-charged (AWS loses revenue) or over-charged (customer trust erodes). At AWS's scale, even a tiny error rate across millions of customers adds up fast.

The existing detection system flagged potential discrepancies, but it generated **230 million false positive alerts per month**. That volume made the alerts useless in practice. Engineers would triage a few, find nothing, and ignore the rest. Real discrepancies were buried in noise.

## The Challenge

The core tension was precision vs. recall:

- **Too aggressive**: Flag everything, drown in false positives (the status quo)
- **Too conservative**: Miss real discrepancies, lose money and customer trust
- **Just right**: Flag only genuine issues, with enough context to act quickly

Additionally, the system had to:

- Process billions of usage records across every AWS service
- Handle the different pricing models, discount programs, and billing cycles
- Run continuously without impacting the billing pipeline's latency
- Produce actionable alerts, not just "something looks wrong"

## The Approach

I designed the Unbilled Usage Auditor as a distributed system with three components:

{{< mermaid >}}
flowchart LR
    A["Smart Sampling\n& Aggregation"] --> B["Multi-Signal\nValidation"]
    B --> C["Automated\nResolution"]
    C --> D{Real issue?}
    D -- Yes --> E["Alert with\ndiagnosis"]
    D -- No --> F["Auto-resolve"]
{{< /mermaid >}}

### 1. Smart Sampling and Aggregation

Instead of checking every individual usage record (which generated the 230M false positives), I aggregated usage at the service-account-period level. This reduced the comparison space by orders of magnitude while preserving the ability to detect genuine discrepancies.

The aggregation was built on {{< badge >}}DynamoDB{{< /badge >}} for its consistent low-latency reads at any scale. Each aggregated record stored the expected charge (from usage records) and the actual charge (from the billing output), along with metadata about the pricing plan and discount programs applied.

### 2. Multi-Signal Validation

A single mismatch between expected and actual charges doesn't necessarily indicate a problem. Pricing changes, retroactive discounts, and billing cycle boundaries all create legitimate temporary discrepancies.

I built a validation pipeline using {{< badge >}}AWS Lambda{{< /badge >}} that checked multiple signals before escalating:

- **Temporal correlation**: Is this a timing issue that will self-correct in the next billing cycle?
- **Pricing context**: Did a pricing change or discount activation explain the difference?
- **Historical pattern**: Has this account/service combination shown similar patterns before?
- **Magnitude thresholds**: Is the discrepancy large enough to warrant investigation?

Only records that failed all validation checks were escalated as genuine alerts.

### 3. Automated Resolution Pipeline

For common discrepancy patterns, the system could trigger automated remediation: re-processing usage records, applying missing discounts, or flagging records for manual review with specific context about what went wrong.

So when an engineer did receive an alert, it came with a diagnosis, not just a symptom.

## The Results

After rolling out the Unbilled Usage Auditor:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Monthly false positives | 230,000,000 | < 1,000 | -99.99% |
| Charge discrepancies | $125,000 | $432 | -99.65% (300x) |
| Time to resolve alerts | Days | Hours | ~10x faster |
| Alert actionability | ~0% (noise) | ~95% (genuine) | Usable |

The 300x reduction in charge discrepancies (from $125,000 to $432) came from catching real issues that were previously buried under false positives. The system didn't just reduce noise. It uncovered signal that had always been there.

## What I Learned

### Correctness Is a Spectrum

In billing systems, "correct" isn't binary. There's the charge that's mathematically right given current pricing, the charge that's right given the customer's expectation, and the charge that's right given the business rules (discounts, credits, negotiations). The system had to reason about all three.

### False Positive Reduction Is Its Own Feature

Reducing false positives wasn't just an optimization. It was a prerequisite for the system being useful at all. A detection system that cries wolf 230 million times a month is a noise generator, not a detection system. The biggest impact came not from finding new problems, but from making existing problems visible.

### Scale Changes the Problem

At AWS scale, approaches that work for thousands of records completely break at billions. The shift from per-record checking to aggregated analysis wasn't just an optimization; it required rethinking the problem from scratch. When your scale changes by 1000x, your architecture probably needs to change, not just your hardware.

{{< alert "graduation-cap" >}}
The hardest part of this project wasn't the distributed systems engineering. It was understanding the domain deeply enough to tell a real discrepancy from expected behavior. Technical skill got me the system; domain knowledge got me the 300x improvement.
{{< /alert >}}

This project shaped how I think about system design: start with correctness guarantees, then optimize for signal-to-noise ratio, and always build systems that explain their decisions.

For more about my career journey and other projects, see my [experience page](/experience/) or [projects page](/projects/).
