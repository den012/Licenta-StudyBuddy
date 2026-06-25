export function dicebearAvatarUrl(userId: number): string {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userId}`;
}
