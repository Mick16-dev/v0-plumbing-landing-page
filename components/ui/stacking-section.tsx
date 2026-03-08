'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StackingSectionProps {
  children: React.ReactNode
  index: number
}

export function StackingSection({ children, index }: StackingSectionProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  // Subtle scale and darken effect as the section is covered
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  return (
    <div ref={container} className="relative">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
