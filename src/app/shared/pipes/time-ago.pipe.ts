import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo', pure: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | undefined | null): string {
    if (!value) {
      return '';
    }
    const date = value instanceof Date ? value : new Date(value);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) {
      return 'Justo ahora';
    }
    const intervals: [number, string][] = [
      [60, 'min'],
      [3600, 'h'],
      [86400, 'd'],
      [604800, 'sem'],
      [2592000, 'mes'],
      [31536000, 'a']
    ];

    for (let i = intervals.length - 1; i >= 0; i--) {
      const [secondsInUnit, label] = intervals[i];
      if (seconds >= secondsInUnit) {
        const valueInUnit = Math.floor(seconds / secondsInUnit);
        return `${valueInUnit}${label}`;
      }
    }

    return `${seconds}s`;
  }
}
