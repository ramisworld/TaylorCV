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
      viewBox="0 0 1080 560"
    >
      <defs>
        <linearGradient id="mp-line" x1="0" y1="0" x2="1080" y2="560">
          <stop offset="0%" stopColor="#315fff" stopOpacity="0.72" />
          <stop offset="48%" stopColor="#625cff" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#7d53f2" stopOpacity="0.62" />
        </linearGradient>

        <filter id="mp-line-glow" x="-30%" y="-120%" width="160%" height="340%">
          <feGaussianBlur result="blur" stdDeviation="2.2" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M350 118 C405 118 405 158 455 158"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeWidth="2"
      />

      <path
        d="M615 158 C660 158 660 118 710 118"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeWidth="2"
      />

      <path
        d="M535 235 C535 272 535 292 535 330"
        stroke="url(#mp-line)"
        strokeDasharray="6 8"
        strokeLinecap="round"
        strokeWidth="2"
      />

      {[
        [350, 118],
        [455, 158],
        [615, 158],
        [710, 118],
        [535, 235],
        [535, 330],
      ].map(([cx, cy]) => (
        <circle
          cx={cx}
          cy={cy}
          fill="#6757ff"
          key={`${cx}-${cy}`}
          r="5.2"
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
