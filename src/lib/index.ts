export function getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 0; i < 10; i++) {
        years.push(currentYear + i);
    }

    return years;
}
