package com.felipebz.zpaweb

import org.sonar.plsqlopen.checks.CheckList
import org.sonar.plsqlopen.squid.AstScanner
import org.sonar.plugins.plsqlopen.api.checks.PlSqlVisitor
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.nio.charset.StandardCharsets

@RestController
@RequestMapping("/api")
class ApiController {

    @PostMapping("/analyze")
    fun analyze(@RequestBody code: String): List<Issue> {
        val scanner = AstScanner(CheckList.checks.map { it.getDeclaredConstructor().newInstance() as PlSqlVisitor },
            null, true, StandardCharsets.UTF_8)
        val issues = scanner.scanFile(FakeFile(code)).issues
        return issues.map { Issue(it) }
    }

}