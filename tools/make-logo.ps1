# Extracts the LM monogram from the full logo badge, keys out the dark
# background to transparency, and writes a small masthead-sized asset.
# Run once:  powershell -ExecutionPolicy Bypass -File tools\make-logo.ps1

Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\images\favicon.png"
$outPath = Join-Path $PSScriptRoot "..\public\images\logo.png"

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $srcPath))

# Monogram bounds within the 1254x1254 badge, excluding the ring and the
# baked-in wordmark underneath it. Measured with tools\probe-mark.ps1, plus a
# few pixels of margin so the antialiased edges survive the downscale.
$crop = New-Object System.Drawing.Rectangle 283, 287, 687, 453
$cropped = $src.Clone($crop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$src.Dispose()

# Key the near-black background out. Edge pixels are a blend of background and
# mark, so un-premultiply their colour to avoid dark fringing.
$loFloor = 46.0
$hiFloor = 96.0

for ($y = 0; $y -lt $cropped.Height; $y++) {
    for ($x = 0; $x -lt $cropped.Width; $x++) {
        $p = $cropped.GetPixel($x, $y)
        $peak = [Math]::Max($p.R, [Math]::Max($p.G, $p.B))

        if ($peak -le $loFloor) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            continue
        }

        if ($peak -ge $hiFloor) { continue }

        $a = ($peak - $loFloor) / ($hiFloor - $loFloor)
        $r = [Math]::Min(255, [int]([Math]::Round($p.R / $a)))
        $g = [Math]::Min(255, [int]([Math]::Round($p.G / $a)))
        $b = [Math]::Min(255, [int]([Math]::Round($p.B / $a)))
        $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb([int]($a * 255), $r, $g, $b))
    }
}

# Roughly 3x the largest rendered size, so it stays crisp on dense displays.
$outHeight = 132
$outWidth = [int][Math]::Round($cropped.Width * ($outHeight / $cropped.Height))

$out = New-Object System.Drawing.Bitmap $outWidth, $outHeight
$gfx = [System.Drawing.Graphics]::FromImage($out)
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gfx.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$gfx.Clear([System.Drawing.Color]::Transparent)
$gfx.DrawImage($cropped, 0, 0, $outWidth, $outHeight)
$gfx.Dispose()
$cropped.Dispose()

$out.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()

$info = Get-Item $outPath
"logo.png  {0}x{1}  {2} bytes" -f $outWidth, $outHeight, $info.Length
