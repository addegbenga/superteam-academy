export const LESSON_CONTENT = ` ## Introduction to Solana

Solana is a high-performance blockchain platform known for its speed and scalability. Unlike other blockchains that rely on sharding or Layer 2 solutions for scalability, Solana achieves high throughput through a unique combination of cryptographic innovations.

## Key Concepts

1. **Proof of History (PoH)**: A cryptographic clock that allows nodes to agree on the time order of events without talking to each other.
2. **Sealevel**: Parallel smart contract runtime.
3. **Tower BFT**: Custom implementation of PBFT optimized for PoH.

## Your First Program

In Solana, smart contracts are called "Programs". They are typically written in Rust.

Let's look at a simple "Hello World" program structure:

\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello Solana!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
\`\`\`

## Understanding the Code

- **declare_id!()**: Specifies the program ID when deployed
- **#[program]**: Marks the module containing instruction handlers
- **pub fn initialize()**: An instruction that logs a message
- **#[derive(Accounts)]**: Custom derive macro that handles account validation
`;

export const INITIAL_CODE = `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod hello_solana {
    use super::*;

    pub function initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello Solana!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
`;


// ==================== DATA ====================
export const SYLLABUS = [
  {
    title: "Introduction To Solana",
    duration: "1 hr",
    lessons: 4,
    items: [
      "Welcome to the Course",
      "What is Solana?",
      "The Vision of a World Computer",
      "Setting up your environment",
    ],
  },
  {
    title: "Blockchain Basics",
    duration: "2 hrs",
    lessons: 6,
    items: [
      "Cryptography 101",
      "Public & Private Keys",
      "Hashing Functions",
      "Blocks and Chains",
      "Consensus Mechanisms",
      "Proof of History",
    ],
  },
  {
    title: "The Solana Ecosystem",
    duration: "1.5 hrs",
    lessons: 5,
    items: [
      "Validators & Nodes",
      "SPL Tokens",
      "The Program Library",
      "Solana Explorer",
      "Wallets and RPCs",
    ],
  },
];

export const INSTRUCTORS = [
  {
    name: "Ciara Nightingale",
    role: "Developer Relations",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Jessica Young",
    role: "Educator",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    name: "Patrick Collins",
    role: "Founder",
    avatar: "https://i.pravatar.cc/100?img=68",
  },
];

export const TESTIMONIALS = [
  {
    name: "Jakub Konopka",
    role: "Senior Product Designer",
    content:
      "Wanna go from curious coder to blockchain engineer? These are some of the best video courses to get you there.",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Gustavo Gonzalez",
    role: "Solutions Engineer",
    content:
      "I took Cyfrin course and I've been working as a solutions developer at OpenZeppelin for the last few months.",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Albert Hu",
    role: "Founding Engineer",
    content:
      "The Cyfrin courses were a game-changer for me. They provided a well-structured and comprehensive introduction to web3.",
    avatar: "https://i.pravatar.cc/100?img=18",
  },
  {
    name: "Radek",
    role: "Senior Developer Advocate",
    content:
      "I took Cyfrin's courses, and I took them seriously. At least one hour every day, documented the progress, didn't skip any second.",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
];

export const LEARNING_OBJECTIVES = [
  "What blockchains are and how they work",
  "How to send transactions",
  "How blockchains scale with L2 rollups",
  "Blockchain threats like MEV and Sybil attacks",
  "Key blockchain components: wallets, gas, nodes",
  "The role and risks of smart contracts",
  "Real-world use cases like DEXs, RWAs",
  "The lifecycle of a blockchain transaction",
];