# // script for automatically writing the automated.js file using a python script


fp = open('tags','r')
fp2 = open('automated.js','a')
for x in fp:
    fp2.write('''var '''+ x.replace("\n","") +'''_elements = document.getElementsByTagName("'''+ x.replace("\n","") +'''")\n''')
    fp2.write('''for(var i=0;i<'''+ x.replace("\n","") +'''_elements.length;i++){\n''')
    fp2.write('''  if('''+ x.replace("\n","") +'''_elements[i].draggable == "true"){\n''')
    fp2.write('''    console.log('------------------------------------------')\n''')
    fp2.write('''    console.log('Guideline 2.5.7 Dragging violation')\n''')
    fp2.write('''    console.log("INNERHTML")\n''')
    fp2.write('''    console.log(''' + x.replace("\n","") + '''_elements[i])\n''')
    fp2.write('''    console.log('------------------------------------------')\n''')
    fp2.write('''    console.log("'''+ x.replace("\n","") +''' element should have single pointer mode of operation!")\n''')
    fp2.write('''    console.log('------------------------------------------')\n''')
    fp2.write('''  }\n''')
    fp2.write('''}\n\n''')
    

