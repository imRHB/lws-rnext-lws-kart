export function getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 0; i < 10; i++) {
        years.push(currentYear + i);
    }

    return years;
}

export function getInitials(fullName: string): string {
    const splitNames = fullName.split(" ");

    const firstInitial = splitNames[0].charAt(0);
    const lastInitial = splitNames[splitNames.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`;
}

export function countdown(duration: number): void {
    let remainingTime = duration;

    const timer = setInterval(() => {
        console.log(`${remainingTime} seconds remaining`);
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(timer);
            console.log("Time's up!");
        }
    }, 1000);
}
