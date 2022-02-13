package com.felipebz.zpaweb

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ZpaWebApplication

fun main(args: Array<String>) {
	runApplication<ZpaWebApplication>(*args)
}
