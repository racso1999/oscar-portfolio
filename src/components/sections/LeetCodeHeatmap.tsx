import { useRef, useEffect, useState, useMemo } from 'react';
import { Prompt } from '../term/Prompt';
import { leetcodeActivity } from '../../data/leetcode';

const MS_PER_DAY = 86_400_000;
const CELL = 13; // px — cell edge
const GAP = 3; // px — gap between cells
const STEP = CELL + GAP;

// Intensity buckets, scaled toward LeetCode's brand orange (#ffa116 =
// rgb(255,161,22)). Index 0 is an inactive day.
const LEVEL_COLORS = [
  'rgba(255, 255, 255, 0.045)',
  'rgba(255, 161, 22, 0.28)',
  'rgba(255, 161, 22, 0.50)',
  'rgba(255, 161, 22, 0.75)',
  '#ffa116',
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function levelFor(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

interface Day {
  ms: number; // UTC-midnight ms for this day
  count: number;
  level: number;
}

/** Build the rolling ~53-week grid ending on the current week, in UTC. */
function buildWeeks() {
  // Count submissions per UTC day-number (ms / MS_PER_DAY).
  const byDayNum = new Map<number, number>();
  for (const [ts, count] of Object.entries(
    leetcodeActivity.submissionCalendar
  )) {
    byDayNum.set(Math.floor((Number(ts) * 1000) / MS_PER_DAY), Number(count));
  }

  const now = new Date();
  const todayNum = Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) /
      MS_PER_DAY
  );
  // Walk back 52 weeks, then to the Sunday that starts that week.
  let startNum = todayNum - 52 * 7;
  startNum -= new Date(startNum * MS_PER_DAY).getUTCDay();

  const weeks: Day[][] = [];
  let activeDays = 0;
  let submissions = 0;
  for (let n = startNum; n <= todayNum; n++) {
    const ms = n * MS_PER_DAY;
    const dow = new Date(ms).getUTCDay();
    if (dow === 0) weeks.push([]);
    const count = byDayNum.get(n) ?? 0;
    if (count > 0) {
      activeDays++;
      submissions += count;
    }
    weeks[weeks.length - 1].push({ ms, count, level: levelFor(count) });
  }

  // Month labels: the column index where each month first appears.
  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const first = week[0];
    if (!first) return;
    const m = new Date(first.ms).getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col, label: MONTHS[m] });
      lastMonth = m;
    }
  });
  // Drop the leading partial month if its label would collide with the next
  // (e.g. a window starting late June shows a cramped "Jun" against "Jul").
  if (monthLabels.length >= 2 && monthLabels[1].col - monthLabels[0].col < 3) {
    monthLabels.shift();
  }

  return { weeks, monthLabels, activeDays, submissions };
}

function tooltip(day: Day): string {
  const date = new Date(day.ms).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const label =
    day.count === 0
      ? 'No submissions'
      : `${day.count} submission${day.count === 1 ? '' : 's'}`;
  return `${label} on ${date}`;
}

export function LeetCodeHeatmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { weeks, monthLabels } = useMemo(buildWeeks, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const gridWidth = weeks.length * STEP - GAP;

  return (
    <section ref={sectionRef} className="relative pt-8 md:pt-12 pb-12 md:pb-16">
      <div
        className="max-w-6xl mx-auto px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 24}px)`,
          transition: 'all 0.7s ease',
        }}
      >
        <Prompt path="~/leetcode" command="git log --activity" className="mb-3" />

        {/* Grid — no card, floats on the page background */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: gridWidth + 40 }}>
            {/* Month labels */}
            <div className="flex" style={{ paddingLeft: 32 }}>
              <div className="relative" style={{ height: 20, width: gridWidth }}>
                {monthLabels.map(({ col, label }) => (
                  <span
                    key={`${label}-${col}`}
                    className="absolute text-xs text-muted-foreground"
                    style={{
                      left: col * STEP,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Weekday labels + grid */}
            <div className="flex">
              {/* Weekday labels (Mon / Wed / Fri) */}
              <div
                className="flex flex-col shrink-0"
                style={{ width: 32, gap: GAP }}
              >
                {WEEKDAYS.map((d, i) => (
                  <span
                    key={d}
                    className="text-xs text-muted-foreground leading-none"
                    style={{
                      height: CELL,
                      lineHeight: `${CELL}px`,
                      fontFamily: 'var(--font-mono)',
                      visibility: i % 2 === 1 ? 'visible' : 'hidden',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Grid of week columns */}
              <div className="flex" style={{ gap: GAP }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                    {week.map((day) => (
                      <div
                        key={day.ms}
                        title={tooltip(day)}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 3,
                          background: LEVEL_COLORS[day.level],
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div
              className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>Less</span>
              {LEVEL_COLORS.map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 3,
                    background: c,
                    display: 'inline-block',
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeetCodeHeatmap;
