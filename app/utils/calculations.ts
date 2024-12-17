export const calculatePathDimensions = (progress: number, windowWidth: number) => {
  const maxHeight = window.innerHeight;
  const expansionProgress = Math.min(1, (progress / 15));
  
  return {
    width: windowWidth,
    height: maxHeight * 0.7,
    scale: expansionProgress,
    opacity: Math.min(1, progress / 10)
  };
};


export const calculateTunnelCircle = (index: number, progress: number, windowWidth: number) => {
  const tunnelDelay = Math.max(0, progress - 5);
  const tunnelProgress = Math.min(1, tunnelDelay / 10);
  
  // Base scale for containing circles within path
  const pathScale = Math.min(1, (progress / 15));
  const maxWidth = windowWidth * pathScale;
  
  // Progressive spacing without affecting intensity
  const baseSpacing = 40;
  const spacingGrowth = 1.2 + (progress * 0.002);
  const spacing = baseSpacing * Math.pow(spacingGrowth, index);
  const depth = -spacing - (progress * 15);
  
  // Consistent base size with subtle depth scaling
  const baseSize = Math.min(10, maxWidth * 0.015);
  const size = baseSize * (1 + (Math.abs(depth) * 0.0003));
  
  // Consistent opacity and color intensity based only on distance
  const distanceFactor = Math.max(0, 1 - (index * 0.03));
  const opacity = tunnelProgress * distanceFactor * 0.6;
  const colorIntensity = Math.max(0.3, 1 - (index * 0.03));
  
  return {
    size,
    depth,
    opacity,
    colorIntensity
  };
};