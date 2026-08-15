import NextImage from "next/image";
import { IMAGES, type ImageKey } from "@/lib/images";

/**
 * Every photograph on the site goes through here so that dimensions, the
 * blur-up placeholder and the alt text stay attached to the asset rather than
 * being re-typed at each call site.
 */
export default function Img({
  name,
  alt,
  sizes = "100vw",
  priority,
  className,
  fill = true,
  quality = 82,
}: {
  name: ImageKey;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  quality?: number;
}) {
  const shot = IMAGES[name];

  if (!fill) {
    return (
      <NextImage
        src={shot.src}
        alt={alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={shot.blur}
        className={className}
      />
    );
  }

  return (
    <NextImage
      src={shot.src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={shot.blur}
      className={className}
    />
  );
}
