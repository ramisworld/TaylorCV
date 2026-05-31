// src/components/landing/MissingProofSection.tsx

"use client";

import {
  BriefcaseBusiness,
  MessageCircleQuestion,
  PencilLine,
  SearchCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { GlassSmileyOrb } from "./GlassSmileyOrb";
import { MissingProofScoreGlassCard } from "./MissingProofScoreGlassCard";

import styles from "./missing-proof-section.module.css";

const benefits = [
  { icon: Target, label: "Spots weak evidence" },
  { icon: MessageCircleQuestion, label: "Asks the right follow-up" },
  { icon: PencilLine, label: "Turns answers into stronger CV bullets" },
] as const;

const questions = [
  "What was the biggest project you led and what was the goal?",
  "What actions did you take and who did you collaborate with?",
  "What tools or frameworks did you use and what was the result?",
] as const;

function IconCircle(props: {
  children: React.ReactNode;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        styles.iconCircle,
        props.small && styles.iconCircleSmall,
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}

function DiagramCard(props: {
  children: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <article className={cn(styles.glassCard, props.className)}>
      <div className={styles.cardHeader}>
        <IconCircle small>{props.icon}</IconCircle>
        <h3 className={styles.cardTitle}>{props.title}</h3>
      </div>
      {props.children}
    </article>
  );
}

function ConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      className={styles.connectorSvg}
      fill="none"
      viewBox="0 0 1000 560"
    >
      <defs>
        <linearGradient id="mp-line" x1="300" y1="90" x2="700" y2="250">
          <stop offset="0%" stopColor="#5d6cff" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#6b63ff" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#7b5cff" stopOpacity="0.86" />
        </linearGradient>

        <filter id="mp-line-glow" x="-30%" y="-120%" width="160%" height="340%">
          <feGaussianBlur result="blur" stdDeviation="1.45" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M440 130 H416 C404 130 398 120 398 108 V106 C398 96 390 91 379 91 H348"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.1"
      />

      <path
        d="M560 130 H584 C596 130 602 120 602 108 V106 C602 96 610 91 621 91 H658"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.1"
      />

      <path
        d="M500 190 V278"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeWidth="2.1"
      />

      {[
        [348, 91],
        [440, 130],
        [560, 130],
        [658, 91],
        [500, 190],
        [500, 278],
      ].map(([cx, cy]) => (
        <circle
          cx={cx}
          cy={cy}
          fill="#655bff"
          key={`${cx}-${cy}`}
          r="4.6"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function MissingProofSection() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.bgBase} />
      <div className={styles.bgArc} />
      <div className={styles.bgContours} />
      <div className={styles.scoreGlow} />

      <div className={styles.scene}>
        <div className={styles.heroBlock}>
          <p className={styles.pill}>
            <Sparkles className="h-[17px] w-[17px]" strokeWidth={2.1} />
            AI-powered CV analyst
          </p>

          <h2 className={styles.headline}>
            <span>TaylorCV finds</span>
            <span>
              the <em className={styles.gradientText}>missing proof.</em>
            </span>
          </h2>

          <p className={styles.subheadline}>
            It compares your background to the job, spots what recruiters still
            need to see, and asks focused questions that turn vague experience
            into stronger evidence.
          </p>

          <div className={styles.benefits}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div className={styles.benefitRow} key={benefit.label}>
                  <IconCircle>
                    <Icon className="h-[24px] w-[24px]" strokeWidth={1.75} />
                  </IconCircle>
                  <p>{benefit.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.diagramStage}>
          <ConnectorLines />

          <DiagramCard
            className={styles.jobCard}
            icon={
              <BriefcaseBusiness
                className="h-[21px] w-[21px]"
                strokeWidth={1.8}
              />
            }
            title="Job requirement"
          >
            <p className={styles.cardBody}>
              Lead cross-functional projects to deliver new features on time and
              improve user outcomes.
            </p>
          </DiagramCard>

          <div className={styles.orbSlot}>
            <GlassSmileyOrb />
          </div>

          <DiagramCard
            className={styles.questionsCard}
            icon={
              <MessageCircleQuestion
                className="h-[21px] w-[21px]"
                strokeWidth={1.8}
              />
            }
            title="Smart questions"
          >
            <div className={styles.questionList}>
              {questions.map((question) => (
                <div className={styles.questionRow} key={question}>
                  <IconCircle small>
                    <MessageCircleQuestion
                      className="h-[16px] w-[16px]"
                      strokeWidth={1.85}
                    />
                  </IconCircle>
                  <p>{question}</p>
                </div>
              ))}
            </div>
          </DiagramCard>

          <DiagramCard
            className={styles.gapCard}
            icon={
              <SearchCheck className="h-[21px] w-[21px]" strokeWidth={1.8} />
            }
            title="Gap detected"
          >
            <p className={styles.cardBody}>
              We don&apos;t see measurable results or the impact your work had
              on the business.
            </p>
          </DiagramCard>
        </div>

        <div className={styles.scoreWrap}>
          <MissingProofScoreGlassCard />
        </div>
      </div>
    </section>
  );
}
