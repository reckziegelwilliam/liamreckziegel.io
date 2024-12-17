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

export const calculateTunnelCircle = (index: number, progress: number) => {
  const tunnelDelay = Math.max(0, progress - 5);
  const tunnelProgress = Math.min(1, tunnelDelay / 10);
  
  const spacing = Math.pow(1.2, index) * 50;
  const depth = -spacing - (progress * 8);
  const baseSize = 8;
  const sizeIncrease = Math.pow(1.15, index) * baseSize;
  
  const opacityDecrease = Math.max(0, 1 - (index * 0.03) - (progress * 0.002));
  const tunnelOpacity = tunnelProgress * opacityDecrease;
  
  return {
    size: sizeIncrease,
    depth,
    opacity: tunnelOpacity
  };
};