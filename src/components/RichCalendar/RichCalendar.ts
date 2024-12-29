import { colorPalette } from "@/styles/ColorPalette.ts";
import { commonTypography } from "@/styles/Typography";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface CalendarEvent {
  date: string; // "YYYY-MM-DD"
  content: string[];
}

@customElement("rich-calendar")
export class RichCalendar extends LitElement {
  @property({ type: Number }) year?: number = new Date().getFullYear();
  @property({ type: Number }) month?: number = new Date().getMonth() + 1;
  @property({ type: Array }) events?: CalendarEvent[] = [];

  @state() private weekdays: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  @state() private transitionState: "entering" | "entered" | "exiting" =
    "entered";

  @state() private selectedEvents: string[] = [];
  @state() private selectedYear: number | null = null;
  @state() private selectedMonth: number | null = null;
  @state() private selectedDay: number | null = null;
  @state() private panelVisible = false;

  static styles = [
    commonTypography,
    colorPalette,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--font-family-sans);
        position: relative;
        padding: var(--spacing-4); /* 16px */
        border-radius: var(--border-radius-base, 4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        --cell-size: 48px;
        --color-text-base: var(--basic-black);
        --color-background-base: var(--basic-white);
        --color-accent: var(--basic-aqua);
        --color-accent-hover: var(--basic-fuchsia);
        --color-border: var(--basic-gray);
        --color-weekend-bg: #f7f7f7;
        --color-weekend-text: var(--basic-black);
        --color-event: var(--basic-red);
        --color-event-bg: var(--basic-lime);
        --color-today-border: var(--basic-aqua);
        --color-today-bg: var(--basic-aqua);
        --color-tooltip-bg: var(--basic-white);
        --color-tooltip-border: var(--basic-gray);
        --color-tooltip-text: var(--basic-black);
        --color-tooltip-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        --transition-fast: 0.2s;
        --transition-medium: 0.3s;
        --border-radius-base: 4px;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --color-text-base: var(--dark-basic-white);
          --color-background-base: var(--dark-basic-black);
          --color-accent: var(--dark-basic-aqua);
          --color-accent-hover: var(--dark-basic-fuchsia);
          --color-border: var(--dark-basic-gray);
          --color-weekend-bg: #444;
          --color-weekend-text: var(--dark-basic-white);
          --color-event: var(--dark-basic-red);
          --color-event-bg: var(--dark-basic-green);
          --color-today-border: var(--dark-basic-aqua);
          --color-today-bg: var(--dark-basic-aqua);
          --color-tooltip-bg: var(--dark-basic-gray);
          --color-tooltip-border: var(--dark-basic-silver);
          --color-tooltip-text: var(--dark-basic-white);
          --color-tooltip-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
      }

      .header {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 360px;
        margin-bottom: var(--spacing-4); /* 16px */
        justify-content: space-between;
        color: var(--color-text-base);
        font-size: var(--font-base);
      }

      .title {
        flex: 1;
        text-align: center;
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        position: relative;
      }

      .title::after {
        content: "";
        display: block;
        width: 60%;
        height: 2px;
        background: var(--color-accent);
        margin: 0 auto;
        margin-top: var(--spacing-1); /* 4px */
        border-radius: var(--border-radius-base);
      }

      .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: var(--font-base);
        padding: var(--spacing-1) var(--spacing-2); /* 4px 8px */
        transition: color var(--transition-fast) ease;
        color: var(--color-text-base);
        border-radius: var(--border-radius-base);
      }

      .nav-button:hover,
      .nav-button:focus {
        color: var(--color-accent);
        outline: none;
      }

      .nav-button.today-button {
        background: var(--color-accent);
        color: var(--color-text-base);
        margin-left: var(--spacing-2); /* 8px */
        transition:
          background var(--transition-fast) ease,
          color var(--transition-fast) ease;
      }

      .nav-button.today-button:hover,
      .nav-button.today-button:focus {
        background: var(--color-accent-hover);
        outline: none;
      }

      .weekdays {
        display: grid;
        grid-template-columns: repeat(7, var(--cell-size));
        gap: var(--spacing-1); /* 4px */
        margin-bottom: var(--spacing-2); /* 8px */
        font-size: var(--font-sm);
        text-align: center;
        font-weight: var(--font-bold);
        width: 100%;
        max-width: 360px;
        color: var(--color-text-base);
      }

      .weekdays .day {
        padding: var(--spacing-1); /* 4px */
        border-radius: var(--border-radius-base);
      }

      .weekdays .day:nth-child(1),
      .weekdays .day:nth-child(7) {
        background: var(--color-weekend-bg);
        color: var(--color-weekend-text);
      }

      .dates {
        display: grid;
        grid-template-columns: repeat(7, var(--cell-size));
        gap: var(--spacing-1); /* 4px */
        font-size: var(--font-sm);
        transition:
          transform var(--transition-medium) ease,
          opacity var(--transition-medium) ease;
        overflow: visible;
        margin-bottom: var(--spacing-4); /* 16px */
        width: 100%;
        max-width: 360px;
      }

      .dates.entering {
        transform: translateX(100%);
        opacity: 0;
      }

      .dates.entered {
        transform: translateX(0);
        opacity: 1;
      }

      .dates.exiting {
        transform: translateX(-100%);
        opacity: 0;
      }

      .date-cell {
        position: relative;
        text-align: center;
        border: 1px solid var(--color-border);
        background: var(--color-background-base);
        cursor: pointer;
        padding: var(--spacing-1); /* 4px */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        aspect-ratio: 1 / 1;
        transition:
          background-color var(--transition-fast),
          color var(--transition-fast),
          transform var(--transition-fast),
          box-shadow var(--transition-fast);
        border-radius: var(--border-radius-base);
        color: var(--color-text-base);
      }

      .date-cell:nth-child(7n + 1),
      .date-cell:nth-child(7n) {
        background: var(--color-weekend-bg);
        color: var(--color-weekend-text);
      }

      .date-cell.today {
        border: 2px solid var(--color-today-border);
        background: var(--color-today-bg);
        color: var(--color-text-base);
      }

      .date-cell:hover,
      .date-cell:focus {
        background: var(--color-accent);
        color: var(--color-text-base);
        transform: scale(1.02);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        outline: none;
        z-index: 1;
      }

      .date-cell:active {
        background: var(--color-accent-hover);
      }

      .date-cell.has-events {
        background: var(--color-event-bg);
        border-color: var(--color-event);
      }

      .day-num {
        font-weight: var(--font-bold);
        font-size: var(--font-sm);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
      }

      .has-events .day-num::after {
        content: "🗓";
        font-size: 12px;
        margin-left: var(--spacing-1); /* 4px */
        vertical-align: middle;
      }

      .event-indicators {
        display: flex;
        justify-content: center;
        margin-top: 2px;
        flex-wrap: wrap;
      }

      .event-dot {
        width: 6px;
        height: 6px;
        background-color: var(--color-event);
        border-radius: 50%;
        margin: 0 1px 1px 0;
      }

      .more-dot {
        width: auto;
        height: auto;
        background: none;
        color: var(--color-event);
        font-size: 8px;
        padding: 0;
        margin-left: 2px;
      }

      .event-preview {
        font-size: var(--font-sm);
        color: var(--color-event);
        margin-top: var(--spacing-1); /* 4px */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .more {
        font-weight: var(--font-bold);
        color: var(--color-text-base);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline;
      }

      .info-panel {
        width: 100%;
        max-width: 360px;
        background: var(--color-tooltip-bg);
        border: 1px solid var(--color-tooltip-border);
        box-shadow: var(--color-tooltip-shadow);
        padding: var(--spacing-2); /* 8px */
        font-size: var(--font-sm);
        border-radius: var(--border-radius-base);
        color: var(--color-tooltip-text);
        margin-top: var(--spacing-4); /* 16px */
        display: none;
        transition: opacity var(--transition-fast) ease;
        position: relative;
      }

      .info-panel.visible {
        display: block;
      }

      .info-panel h3 {
        margin-top: 0;
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        border-bottom: 1px solid var(--color-tooltip-border);
        padding-bottom: var(--spacing-1); /* 4px */
        margin-bottom: var(--spacing-2); /* 8px */
        text-align: left;
        color: var(--color-tooltip-text);
      }

      .info-panel ul {
        padding-left: 20px;
        margin: 0;
        list-style: disc;
        text-align: left;
        max-height: 100px;
        overflow-y: auto;
        line-height: 1.5;
        font-size: var(--font-sm);
      }

      .info-panel li {
        margin-bottom: var(--spacing-1); /* 4px */
        color: var(--color-tooltip-text);
      }

      .info-panel .close-button {
        position: absolute;
        top: var(--spacing-1); /*4px*/
        right: var(--spacing-1); /*4px*/
        background: none;
        border: none;
        cursor: pointer;
        font-size: var(--font-lg);
        color: var(--color-tooltip-text);
      }

      .info-panel .close-button:hover,
      .info-panel .close-button:focus {
        color: var(--color-accent);
      }

      @media (max-width: 600px) {
        :host {
          --cell-size: 36px;
        }
        .header {
          font-size: var(--font-sm);
        }
        .weekdays {
          font-size: var(--font-xs);
        }
        .day-num {
          font-size: var(--font-xs);
        }
        .event-preview {
          display: none;
        }
        .event-indicators {
          margin-top: 1px;
        }
        .event-dot {
          width: 5px;
          height: 5px;
        }
        .more-dot {
          font-size: 7px;
        }
        .info-panel {
          padding: var(--spacing-1);
          font-size: var(--font-xs);
        }
        .info-panel h3 {
          font-size: var(--font-xs);
          padding-bottom: var(--spacing-1); /* 4px */
          margin-bottom: var(--spacing-1); /* 4px */
        }
        .info-panel ul {
          padding-left: 16px;
          max-height: 80px;
        }
        .no-events {
          text-align: center;
          color: var(--color-tooltip-text);
          font-size: var(--font-xs);
        }
        .day-num {
          text-overflow: clip;
        }
        .has-events .day-num::after {
          content: "";
        }
      }

      @media (min-width: 800px) {
        :host {
          --cell-size: 60px;
        }
        .header {
          font-size: var(--font-lg);
        }
        .weekdays {
          font-size: var(--font-base);
        }
        .day-num {
          font-size: var(--font-base);
        }
        .event-preview {
          font-size: var(--font-base);
        }
        .info-panel h3 {
          font-size: var(--font-base);
        }
        .info-panel ul {
          font-size: var(--font-sm);
        }
        .event-dot {
          width: 6px;
          height: 6px;
        }
        .more-dot {
          font-size: 8px;
        }
      }

      .no-events {
        text-align: center;
        color: var(--color-tooltip-text);
        font-size: var(--font-xs);
      }
    `,
  ];

  render() {
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;

    return html`
      <div
        class="header"
        aria-label="${year}年${month}月カレンダー"
        aria-live="polite"
        aria-atomic="true"
      >
        <button
          class="nav-button"
          role="button"
          @click=${this.prevMonth}
          aria-label="前月へ"
          title="Previous Month"
          aria-controls="calendar-dates"
        >
          &lt;
        </button>
        <div class="title" id="calendar-title">${year}年 ${month}月</div>
        <div>
          <button
            class="nav-button"
            role="button"
            @click=${this.nextMonth}
            aria-label="次月へ"
            title="Next Month"
            aria-controls="calendar-dates"
          >
            &gt;
          </button>
          <button
            class="nav-button today-button"
            role="button"
            @click=${this.goToToday}
            aria-label="今日へ"
            title="Go to Today"
            aria-controls="calendar-dates"
          >
            Today
          </button>
        </div>
      </div>

      <div class="weekdays">
        ${this.weekdays.map((day) => html`<div class="day">${day}</div>`)}
      </div>

      <div
        class="dates ${this.transitionState}"
        role="grid"
        aria-labelledby="calendar-title"
        id="calendar-dates"
        aria-live="polite"
        aria-atomic="true"
      >
        ${this.renderDays()}
      </div>

      <div
        class="info-panel ${this.panelVisible ? "visible" : ""}"
        aria-live="polite"
      >
        <button
          class="close-button"
          @click=${this.closePanel}
          aria-label="パネルを閉じる"
        >
          ×
        </button>
        ${this.panelVisible &&
        this.selectedYear !== null &&
        this.selectedMonth !== null &&
        this.selectedDay !== null
          ? this.selectedEvents.length > 0
            ? html`
                <h3>
                  ${this.selectedYear}年${this.selectedMonth}月${this
                    .selectedDay}日
                </h3>
                <ul role="list">
                  ${this.selectedEvents.map(
                    (ev) => html`<li role="listitem">${ev}</li>`
                  )}
                </ul>
              `
            : html`
                <h3>
                  ${this.selectedYear}年${this.selectedMonth}月${this
                    .selectedDay}日
                </h3>
                <p class="no-events">イベントはありません</p>
              `
          : nothing}
      </div>

      <slot></slot>
    `;
  }

  renderDays() {
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;
    const events = this.events ?? [];
    const days = this.getDaysInMonth(year, month);
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const todayStr = this.formatDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    );

    const emptyCells = Array.from(
      { length: firstDayIndex },
      () => html`<div></div>`
    );

    const dayCells = days.map((day) => {
      const dayStr = this.formatDate(year, month, day);
      const dayEvents = events.find((e) => e.date === dayStr)?.content || [];
      const isToday = dayStr === todayStr;
      const hasEventsClass = dayEvents.length > 0 ? "has-events" : "";
      const ariaLabel =
        dayEvents.length > 0
          ? `${year}年${month}月${day}日、イベント${dayEvents.length}件`
          : `${year}年${month}月${day}日`;
      const ariaCurrent = isToday ? "date" : nothing;

      return html`
        <div
          class="date-cell ${isToday ? "today" : ""} ${hasEventsClass}"
          aria-label=${ariaLabel}
          role="gridcell"
          aria-current=${ariaCurrent}
          tabindex="0"
          @click=${() => this.toggleDayInfo(year, month, day, dayEvents)}
          @keydown=${(e: KeyboardEvent) =>
            this.handleKeyDown(e, year, month, day, dayEvents)}
        >
          <span class="day-num">${day}</span>
          ${dayEvents.length > 0
            ? html`
                <div class="event-indicators">
                  ${dayEvents
                    .slice(0, 3)
                    .map(() => html`<span class="event-dot"></span>`)}
                  ${dayEvents.length > 3
                    ? html`<span class="event-dot more-dot">+</span>`
                    : ""}
                </div>
                <div class="event-preview">
                  ${dayEvents[0]}${dayEvents.length > 1
                    ? html` <span class="more"
                        >+${dayEvents.length - 1} more</span
                      >`
                    : ""}
                </div>
              `
            : nothing}
        </div>
      `;
    });

    return html`${emptyCells}${dayCells}`;
  }

  toggleDayInfo(year: number, month: number, day: number, events: string[]) {
    if (
      this.panelVisible &&
      this.selectedYear === year &&
      this.selectedMonth === month &&
      this.selectedDay === day
    ) {
      this.closePanel();
      return;
    }

    this.selectedYear = year;
    this.selectedMonth = month;
    this.selectedDay = day;
    this.selectedEvents = events;
    this.panelVisible = true;
  }

  handleKeyDown(
    e: KeyboardEvent,
    year: number,
    month: number,
    day: number,
    events: string[]
  ) {
    if (e.key === "Enter") {
      this.toggleDayInfo(year, month, day, events);
    }
  }

  closePanel() {
    this.panelVisible = false;
    this.selectedYear = null;
    this.selectedMonth = null;
    this.selectedDay = null;
    this.selectedEvents = [];
  }

  getDaysInMonth(year: number, month: number): number[] {
    const lastDay = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  }

  formatDate(year: number, month: number, day: number): string {
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  }

  goToToday() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.requestUpdate();
  }

  prevMonth() {
    if (this.transitionState !== "entered") return;
    this.transitionState = "exiting";
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;
    const targetYear = month === 1 ? year - 1 : year;
    const targetMonth = month === 1 ? 12 : month - 1;

    setTimeout(() => {
      this.year = targetYear;
      this.month = targetMonth;
      this.transitionState = "entering";
      requestAnimationFrame(() => {
        this.transitionState = "entered";
      });
    }, 300);
  }

  nextMonth() {
    if (this.transitionState !== "entered") return;
    this.transitionState = "exiting";
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;
    const targetYear = month === 12 ? year + 1 : year;
    const targetMonth = month === 12 ? 1 : month + 1;

    setTimeout(() => {
      this.year = targetYear;
      this.month = targetMonth;
      this.transitionState = "entering";
      requestAnimationFrame(() => {
        this.transitionState = "entered";
      });
    }, 300);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("year") || changedProperties.has("month")) {
      this.requestUpdate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "rich-calendar": RichCalendar;
  }
}
