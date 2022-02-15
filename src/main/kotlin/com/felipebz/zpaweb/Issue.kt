package com.felipebz.zpaweb

import org.sonar.plsqlopen.squid.ZpaIssue

class Issue(it: ZpaIssue) {
    val message = it.primaryLocation.message()
    val startLine = it.primaryLocation.startLine()
    val startColumn = it.primaryLocation.startLineOffset() + 1
    val endLine = it.primaryLocation.endLine()
    val endColumn = it.primaryLocation.endLineOffset() + 1
}
