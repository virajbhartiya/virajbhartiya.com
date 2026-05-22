---
title: "I Miss the Era of Tinkering With Computers"
description: "I used to open CRT monitors for fun. Now the tools are so good you can ship without ever descending a layer. Here's what gets lost — and why I still tinker anyway."
publishedAt: "2026-05-20"
tags: ["Personal", "Computing", "Tinkering"]
image: "/images/Blog/tinkering-era/banner.svg"
author: "Viraj Bhartiya"
---

There's a smell to opening a CRT monitor.

Hot copper. Dust burning off the back of the tube. A faint ozone tang from a transformer that hasn't finished cooling. I knew that smell before I knew the word _capacitor._ I knew it before anyone bothered to tell me CRTs hold twenty-five thousand volts for weeks after you pull the plug, and that touching the wrong terminal will throw you across the room.

I was eleven.

![The inside of a CRT monitor: flyback transformer, deflection yoke, and the capacitor that absolutely should not be touched](/images/Blog/tinkering-era/crt.svg)

I'd unscrew the back panel, sit cross-legged on the floor, and stare at the inside like it was a city map. The flyback. The yoke. The thick rubber suction cup that you absolutely don't peel off the side of the tube. None of it had names yet. It was just _the stuff that makes the picture happen,_ and I wanted to know which piece did what.

I opened every computer in the house, too. The desktop. The slower desktop. The one my parents had explicitly said couldn't be opened "because it'll break." I'd pull the RAM, sniff the heatsink for that faint melted-plastic smell that meant something was wrong, reseat the modules, screw it back together, and pray it booted. Sometimes it didn't. Sometimes I had to figure out why before anyone noticed.

Nobody taught me any of this. There was no YouTube tutorial to follow. I just wanted to know.

That's the part that's hard to explain to people now. There was nobody to show. Nothing to put on a résumé. Just a kid taking things apart in the corner of his room and learning more from each failed reboot than from anything he was being graded on at school.

---

In 10th grade, during the COVID lockdown, I got obsessed with automating my room. The reason was deeply stupid: the switchboard was on the opposite wall, and I didn't want to get up every time the light or fan needed to change.

I had no real hardware and zero background in embedded systems or electronics. So I bought a Raspberry Pi and taught myself everything from scratch. GPIO pins. Relays. Networking. Linux internals. How a smart home device, the kind that sits sealed inside a box at the electronics store, actually announces itself to Alexa.

![My Raspberry Pi setup: relays wired into the room's switchboard, jumper cables everywhere, definitely not to code](/images/Blog/tinkering-era/pi-setup.svg)

The hardware was the easy part, eventually. The hard part was making it work with Alexa _natively_, not through some IFTTT bridge that adds a four-second delay and dies every time the wifi blinks. I wanted Alexa to think my soldered-together Frankenstein was a real product.

So I borrowed my neighbor's Belkin smart plug.

I plugged it in, set up Wireshark on my laptop, and watched its traffic for an entire afternoon. M-SEARCH discovery packets fired into multicast. A setup.xml dropping back with the device descriptor. SOAP envelopes with `<BinaryState>1</BinaryState>` flying back and forth like they had nothing to hide.

![Wireshark capturing the Belkin plug's discovery traffic: UPnP broadcasts, SOAP envelopes, the whole protocol staring at me](/images/Blog/tinkering-era/wireshark.svg)

Most of it was nonsense at first. I didn't know what UPnP was. I didn't know what SOAP was. I had to google "what is an envelope in HTTP" with a straight face. But after enough trial and error, I had my Raspberry Pi pretending to be a Belkin Wemo. Alexa couldn't tell the difference.

The first time I said "Alexa, turn off the light" and my ceiling fan responded instead (wrong relay, right idea), I think I scared my mom into the next room.

The risks were real. I was wiring a relay module into a 240V line based on a YouTube diagram I'd half-understood. I nearly fried the Pi multiple times. I was spending hours on this when I was supposed to be preparing for entrance exams, which probably looked irresponsible to everyone watching from outside my room. And I came embarrassingly close to frying my neighbor's plug while poking at it, which would have been a conversation I really did not want to have.

Years later, when I started writing distributed systems for real, I realized that one stupid project had done more for me than any textbook. Not the wiring. Not the protocol stuff. The fact that I'd stopped being afraid of things I didn't understand yet.

---

I don't notice this much in kids anymore. Not because they're less curious. Because nothing is making them go down. You can build a real app without ever opening a terminal. You can ship a side project to thousands of users without ever knowing what happens on the other side of an API call.

I'm not nostalgic about writing assembly or babysitting bare metal. Every layer in the stack exists because someone hated the layer below it, and I've used all of them gratefully. The shift isn't that the layers got better. It's that going below them used to be unavoidable, and now it's a choice almost nobody makes.

I catch it in myself. I'll accept a chunk of code from Claude that does something I don't fully understand. The tests pass. The feature works. I have six other things to ship that day. I close the diff. Six months later I'm back in that file with no memory of writing it and no real sense of what it does, and I get the same small flicker of dread I used to get when the family PC wouldn't boot.

Except the family PC, I could open. I had to.

This file, I can just ask the model again. The model will guess. The Stack Overflow answer will be from 2019. The senior engineer who would've sat with the problem until 2 AM is doing something else now.

The thing I've actually leaned on every single day since is the intuition. Knowing roughly where to look when a service stops responding. Knowing which API docs are lying. Knowing when an error message means something different from what it says out loud. That came from breaking things, not from reading about them. From hours of pointless, unsupervised wrecking that nobody graded and nobody saw.

You don't get that handed to you. You have to go find something to take apart.

---

If I'm honest, that's what most of my side projects still are. They look like serious engineering from a distance, but [Raftokay](https://github.com/virajbhartiya/raftokay) started because etcd felt like a magic box and magic boxes bother me. The others (a [compute protocol](https://github.com/theblitlabs/parity-protocol), a [memory layer](https://github.com/cogniahq/cognia)) all started the same way. Something I was using felt opaque, and I needed to know what was actually inside it before I could keep using it with a straight face.

Nobody asked for these. Nobody is paying for them. They exist because once you've spent a childhood taking things apart, doing the work without the taking-apart starts to feel like reading the menu instead of eating.

If you're twelve and reading this, go take something apart. It doesn't have to make sense. It doesn't have to be useful. Nobody has to know you're doing it. The smoother the tools get on the surface, the more deliberate you'll have to be about going underneath them.

---

![My desk now: different hardware, same impulse](/images/Blog/tinkering-era/desk.svg)

The eleven-year-old who opened the CRT is still in here. So is the fifteen-year-old reverse-engineering a Belkin plug at 1 AM. Most days, they're the ones I trust to do the work.

The era of tinkering isn't dead. It just became a choice.

I'm still choosing it.
