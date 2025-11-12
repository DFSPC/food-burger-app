#!/usr/bin/env python3
from PIL import Image, ImageDraw

def create_burger_icon(size, filename):
    """Create a simple burger icon"""
    img = Image.new('RGB', (size, size), color='#ff6b35')
    draw = ImageDraw.Draw(img)

    center_x, center_y = size // 2, size // 2

    # Draw simplified burger
    # Top bun
    draw.ellipse([size*0.2, size*0.25, size*0.8, size*0.45], fill='#f4a460')

    # Lettuce
    draw.rectangle([size*0.22, size*0.45, size*0.78, size*0.52], fill='#7cb342')

    # Cheese
    draw.polygon([
        (size*0.24, size*0.52),
        (size*0.76, size*0.52),
        (size*0.74, size*0.58),
        (size*0.26, size*0.58)
    ], fill='#ffd54f')

    # Patty
    draw.ellipse([size*0.23, size*0.56, size*0.77, size*0.64], fill='#8b4513')

    # Bottom bun
    draw.ellipse([size*0.21, size*0.63, size*0.79, size*0.78], fill='#daa520')

    # Add white circle border
    draw.ellipse([2, 2, size-2, size-2], outline='white', width=max(2, size//40))

    img.save(filename, 'PNG')
    print(f"Created {filename}")

# Create different sizes
create_burger_icon(512, '/home/dfandino/food-burger-app/public/favicon.png')
create_burger_icon(192, '/home/dfandino/food-burger-app/public/icon-192.png')
create_burger_icon(512, '/home/dfandino/food-burger-app/public/icon-512.png')

print("Icons generated successfully!")
