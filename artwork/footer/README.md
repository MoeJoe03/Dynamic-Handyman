# Footer vector layering

`source.svg` is the unchanged source supplied for this task. The source has five
compound colour paths (18,426 contours) plus the grid pattern path. No raster
image, new illustration, colour change, or path simplification is used.

## Deliverables

- `public/images/dynamic-handyman-footer-layered.svg`: static layered artwork.
- `public/images/dynamic-handyman-animated-footer.svg`: the same layers with CSS
  transform animations; this is the asset used by the website's existing img.

Ten hand/tool assemblies are isolated using hand-fitted vector regions in
`regions.json`. Original path contours are retained. Contours that cross a
region boundary use SVG clipping, including contours joined to blueprint lines.
Overlapping region envelopes are partitioned in a fixed order so neighbouring
hands do not duplicate one another. The grid, diamond, and background details
are in `stationary-blueprint` and receive no animation.

Each assembly uses a fixed outer translation to its lower-arm pivot, an animated
rotation group, and a fixed inverse translation that restores original path
coordinates. Rotations are ±1.2 degrees with independent 4.3–6.9 second durations
and negative delays. Only these ten groups animate. Reduced-motion preferences
disable the animation and return every group to its original pose.

## Reproduce

From the repository root, using Python's standard library:

```
python artwork/footer/separate.py
```

This writes the static deliverable. Compare it visually with the source first.
After that comparison:

```
python artwork/footer/separate.py --animate
```

Optional `--inspect` writes region outlines and static ±1.2-degree extremes for
visual inspection. No build-time or browser dependency is added.

## Verification performed

- Rendered the source and static layers at their native 2171 × 724 dimensions.
  Composition and halftone details were compared visually. Mean RGB-channel
  difference was 0.0113 / 255; 29 of 1,571,804 pixels differed by more than 16
  levels, confined to clipped/antialiased boundaries. This is a visual match,
  not a claim of byte-identical or pixel-identical output.
- Inspected the isolated background for stranded hand/tool fragments and refined
  the regions around the wrench, roller, drill, hammer and small tools.
- Inspected both rotation extremes for all ten assemblies.
- Confirmed ten distinct running CSS transforms and configured durations in the
  browser; the background's computed transform is `none`.
- Checked the existing website img on desktop and a 390-pixel mobile viewport.
  It retains its aspect ratio, full composition and no horizontal overflow.
- Reduced-motion fallback is present in the SVG CSS. OS preference emulation and
  separate Firefox/Safari execution were not available in this verification.

The original already crops several arms at the canvas edges. The animated file
retains those canvas bounds; subtle movement at those original edges is expected.
