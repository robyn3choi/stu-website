// TODO: add bezier curve or something really exaggerated
export function quadraticEase(time, startValue, endValue, duration) {
	time /= duration / 2;
     if (time < 1)  {
          return endValue / 2 * time * time * time * time + startValue;
     }
     else {
     	time -= 2;
     	return -endValue / 2 * (time * time * time * time - 2) + startValue;
     }
}

export function circularEase (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};