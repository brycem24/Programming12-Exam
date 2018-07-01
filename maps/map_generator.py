class Color:
   PURPLE = '\033[95m'
   CYAN = '\033[96m'
   DARKCYAN = '\033[36m'
   BLUE = '\033[94m'
   GREEN = '\033[92m'
   YELLOW = '\033[93m'
   RED = '\033[91m'
   BOLD = '\033[1m'
   UNDERLINE = '\033[4m'
   END = '\033[0m'

print(Color.BOLD + "Welcome to your ghetto tile-editor." + Color.END)
mapName = input(Color.RED + "Please enter a name for your map:" + Color.END + " (without spaces or an extension) \n")
print("Please create an image using the super-secret palette")
print("When it's done, I'll convert it to a format you can use...")
filePath = input(Color.RED + "What's the name and extension of your file?" + Color.END + "\n");
print (filePath)

from PIL import Image
image = Image.open(filePath, 'r')
pixelData = list(image.getdata())

import math

class PixelColors: 
    PINK = (215,123,186)
    GREEN = (106,190,48)
    LIME = (153,229,80)
    BROWN = (102,57,49)

# COLOURS TO TILES:
# pink - flowers - 0
# green - flat grass - 1
# lime - long grass - 2
# brown - mountain - 3

outputData = []
for pixel in pixelData:
    if pixel == PixelColors.PINK:
        outputData.append(0)
    elif pixel == PixelColors.GREEN:
        outputData.append(1)
    elif pixel == PixelColors.LIME:
        outputData.append(2)
    elif pixel == PixelColors.BROWN: 
        outputData.append(3)

mapSize =  int(math.sqrt(len(pixelData)));
output = str([outputData[i:i+mapSize] for i in range(0, len(outputData), mapSize)])

print(pixelData)
print("Generating a map with the area: " + str(mapSize) + "x" + str(mapSize))

with open(mapName + ".js", "w") as outputFile:
    outputFile.write(output)

print(Color.YELLOW + "All done! " + Color.END + "File created with the name: " + mapName + ".js" )
