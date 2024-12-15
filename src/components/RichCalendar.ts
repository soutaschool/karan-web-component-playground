import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface CalendarEvent {
  date: string; // "YYYY-MM-DD"
  content: string[];
}

@customElement('rich-calendar')
export class RichCalendar extends LitElement {
  @property({ type: Number }) year?: number = new Date().getFullYear();
  @property({ type: Number }) month?: number = new Date().getMonth() + 1;
  @property({ type: Array }) events?: CalendarEvent[] = [];

  @state() private weekdays: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  @state() private transitionState: 'entering' | 'entered' | 'exiting' =
    'entered';

  @state() private selectedEvents: string[] = [];
  @state() private selectedYear: number | null = null;
  @state() private selectedMonth: number | null = null;
  @state() private selectedDay: number | null = null;
  @state() private panelVisible = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: system-ui, sans-serif;
      position: relative;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      --cell-size: 48px;

      /* Light mode */
      --basic-aqua: #e0f7fa;
      --basic-aqua-hover: #b2ebf2;
      --basic-green: #81c784;
      --basic-green-hover: #66bb6a;
      --basic-red: #e53935;
      --basic-gray: #ccc;
      --basic-black: #000;
      --basic-white: #fff;
      --basic-light-green: #c8e6c9;

      --tooltip-bg: var(--basic-white);
      --tooltip-border: var(--basic-gray);
      --tooltip-color: var(--basic-black);
      --tooltip-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      --tooltip-padding: 8px;
      --tooltip-font-size: 14px;

      --weekend-bg: #f7f7f7;
      --weekend-color: var(--basic-black);

      @media (prefers-color-scheme: dark) {
        --basic-aqua: #00796b;
        --basic-aqua-hover: #004d40;
        --basic-green: #388e3c;
        --basic-green-hover: #2e7d32;
        --basic-red: #f44336;
        --basic-gray: #666;
        --basic-black: #eee;
        --basic-white: #333;
        --basic-light-green: #4f6d4f;

        --tooltip-bg: #444;
        --tooltip-border: #666;
        --tooltip-color: #eee;
        --tooltip-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

        --weekend-bg: #444;
        --weekend-color: #fff;
      }
    }

    .header {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 360px;
      margin-bottom: 16px;
      justify-content: space-between;
      color: var(--basic-black);
    }

    .title {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      position: relative;
    }

    .title::after {
      content: '';
      display: block;
      width: 60%;
      height: 2px;
      background: var(--basic-aqua);
      margin: 0 auto;
      margin-top: 4px;
      border-radius: 2px;
    }

    .nav-button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      transition: color 0.2s ease;
      color: var(--basic-black);
    }

    .nav-button:hover,
    .nav-button:focus {
      color: var(--basic-aqua);
      outline: none;
    }

    .nav-button.today-button {
      background: var(--basic-aqua);
      color: var(--basic-black);
      border-radius: 4px;
      margin-left: 8px;
      transition:
        background 0.2s ease,
        color 0.2s ease;
    }

    .nav-button.today-button:hover,
    .nav-button.today-button:focus {
      background: var(--basic-aqua-hover);
      outline: none;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, var(--cell-size));
      gap: 4px;
      margin-bottom: 8px;
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      width: 100%;
      max-width: 360px;
      color: var(--basic-black);
    }

    .weekdays .day {
      padding: 4px;
      border-radius: 4px;
    }

    .weekdays .day:nth-child(1),
    .weekdays .day:nth-child(7) {
      background: var(--weekend-bg);
      color: var(--weekend-color);
    }

    .dates {
      display: grid;
      grid-template-columns: repeat(7, var(--cell-size));
      gap: 4px;
      font-size: 12px;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
      overflow: visible;
      margin-bottom: 16px;
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
      border: 1px solid var(--basic-gray);
      background: var(--basic-white);
      cursor: pointer;
      padding: 4px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      aspect-ratio: 1 / 1;
      transition:
        background-color 0.2s,
        color 0.2s,
        transform 0.1s,
        box-shadow 0.1s;
      border-radius: 4px;
      color: var(--basic-black);
    }

    .date-cell:nth-child(7n + 1),
    .date-cell:nth-child(7n) {
      background: var(--weekend-bg);
      color: var(--weekend-color);
    }

    .date-cell.today {
      border: 2px solid var(--basic-aqua);
      background: var(--basic-aqua);
      color: var(--basic-black);
    }

    .date-cell:hover,
    .date-cell:focus {
      background: var(--basic-aqua);
      color: var(--basic-black);
      transform: scale(1.02);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      outline: none;
      z-index: 1;
    }

    .date-cell:active {
      background: var(--basic-green-hover);
    }

    .date-cell.has-events {
      background: var(--basic-light-green);
      border-color: var(--basic-green);
    }

    .day-num {
      font-weight: bold;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
    }

    .has-events .day-num::after {
      content: '🗓';
      font-size: 12px;
      margin-left: 4px;
      vertical-align: middle;
    }

    .event-indicators {
      display: flex;
      justify-content: center;
      margin-top: 2px;
    }

    .event-dot {
      width: 6px;
      height: 6px;
      background-color: var(--basic-red);
      border-radius: 50%;
      margin: 0 1px;
    }

    .more-dot {
      width: auto;
      height: auto;
      background: none;
      color: var(--basic-red);
      font-size: 8px;
      padding: 0;
      margin-left: 2px;
    }

    .event-preview {
      font-size: 12px;
      color: var(--basic-red);
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more {
      font-weight: bold;
      color: var(--basic-black);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline;
    }

    .info-panel {
      width: 100%;
      max-width: 360px;
      background: var(--tooltip-bg);
      border: 1px solid var(--tooltip-border);
      box-shadow: var(--tooltip-shadow);
      padding: var(--tooltip-padding);
      font-size: var(--tooltip-font-size);
      border-radius: 4px;
      color: var(--tooltip-color);
      margin-top: 16px;
      display: none;
      transition: opacity 0.2s ease;
      position: relative;
    }

    .info-panel.visible {
      display: block;
    }

    .info-panel h3 {
      margin-top: 0;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid var(--tooltip-border);
      padding-bottom: 4px;
      margin-bottom: 8px;
      text-align: left;
      color: var(--tooltip-color);
    }

    .info-panel ul {
      padding-left: 20px;
      margin: 0;
      list-style: disc;
      text-align: left;
      max-height: 100px;
      overflow-y: auto;
      line-height: 1.5;
    }

    .info-panel li {
      margin-bottom: 6px;
      color: var(--tooltip-color);
    }

    /* Close button for info panel */
    .info-panel .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: var(--tooltip-color);
    }
    .info-panel .close-button:hover,
    .info-panel .close-button:focus {
      color: var(--basic-aqua);
    }

    @media (max-width: 400px) {
      :host {
        --cell-size: 36px;
      }
      .header {
        font-size: 14px;
      }
      .weekdays {
        font-size: 10px;
      }
      .day-num {
        font-size: 12px;
      }
      .event-preview {
        font-size: 10px;
      }
      .info-panel h3 {
        font-size: 12px;
      }
      .info-panel ul {
        font-size: 12px;
      }
      .event-dot {
        width: 5px;
        height: 5px;
      }
      .more-dot {
        font-size: 7px;
      }
    }

    @media (min-width: 800px) {
      :host {
        --cell-size: 60px;
      }
      .header {
        font-size: 20px;
      }
      .weekdays {
        font-size: 14px;
      }
      .day-num {
        font-size: 16px;
      }
      .event-preview {
        font-size: 14px;
      }
      .info-panel h3 {
        font-size: 16px;
      }
      .info-panel ul {
        font-size: 14px;
      }
    }
  `;

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
        class="info-panel ${this.panelVisible ? 'visible' : ''}"
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
                <p
                  style="text-align:center; color:var(--tooltip-color); font-size:12px;"
                >
                  イベントはありません
                </p>
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
      const hasEventsClass = dayEvents.length > 0 ? 'has-events' : '';
      const ariaLabel =
        dayEvents.length > 0
          ? `${year}年${month}月${day}日、イベント${dayEvents.length}件`
          : `${year}年${month}月${day}日`;
      const ariaCurrent = isToday ? 'date' : nothing;

      return html`
        <div
          class="date-cell ${isToday ? 'today' : ''} ${hasEventsClass}"
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
                    : ''}
                </div>
                <div class="event-preview">
                  ${dayEvents[0]}${dayEvents.length > 1
                    ? html` <span class="more"
                        >+${dayEvents.length - 1} more</span
                      >`
                    : ''}
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
    if (e.key === 'Enter') {
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
    const m = String(month).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  goToToday() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.requestUpdate();
  }

  prevMonth() {
    if (this.transitionState !== 'entered') return;
    this.transitionState = 'exiting';
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;
    const targetYear = month === 1 ? year - 1 : year;
    const targetMonth = month === 1 ? 12 : month - 1;

    setTimeout(() => {
      this.year = targetYear;
      this.month = targetMonth;
      this.transitionState = 'entering';
      requestAnimationFrame(() => {
        this.transitionState = 'entered';
      });
    }, 300);
  }

  nextMonth() {
    if (this.transitionState !== 'entered') return;
    this.transitionState = 'exiting';
    const year = this.year ?? new Date().getFullYear();
    const month = this.month ?? new Date().getMonth() + 1;
    const targetYear = month === 12 ? year + 1 : year;
    const targetMonth = month === 12 ? 1 : month + 1;

    setTimeout(() => {
      this.year = targetYear;
      this.month = targetMonth;
      this.transitionState = 'entering';
      requestAnimationFrame(() => {
        this.transitionState = 'entered';
      });
    }, 300);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('year') || changedProperties.has('month')) {
      this.requestUpdate();
    }
  }
}
