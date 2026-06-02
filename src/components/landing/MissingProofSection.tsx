"use client";

import type { ReactNode } from "react";
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
  children: ReactNode;
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
  children: ReactNode;
  className?: string;
  icon: ReactNode;
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
      xia-hidden="true"
      className={styles.connectorSvg}
      fill="none"
      viewBox="0 0 1000 560"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="mp-line"
          x1="330"
          y1="70"
          x2="675"
          y2="245"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5f67ff" stopOpacity="0.88" />
          <stop offset="52%" stopColor="#6560ff" stopOpacity="0.84" />
          <stop offset="100%" stopColor="#755cff" stopOpacity="0.86" />
        </linearGradient>

        <filter
          id="mp-line-glow"
          x="340"
          y="20"
          width="360"
          height="290"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur result="blur" stdDeviation="1.15" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* left arm - raised higher */}
      <path
        d="M445 128 H421 Q409 128 409 116 V89 Q409 77 397 77 H384"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />

      {/* right arm - raised higher */}
      <path
        d="M565 128 H589 Q601 128 601 116 V58 Q601 44 613 44 H633"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />

      {/* vertical connector - unchanged */}
      {/* vertical connector - connects the two bottom purple circles */}
      {/* vertical connector - reliable straight line between bottom circles */}
      <path
        d="M505 200 V276"
        filter="url(#mp-line-glow)"
        stroke="url(#mp-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />

      {[
        [384, 78],
        [444, 128],
        [565, 128],
        [633, 44],
        [505, 200],
        [505, 276],
      ].map(([cx, cy]) => (
        <ellipse
          cx={cx}
          cy={cy}
          fill="#665cff"
          key={`${cx}-${cy}`}
          rx="4.8"
          ry="5.75"
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
