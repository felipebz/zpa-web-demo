package com.felipebz.zpaweb

import org.sonar.plugins.plsqlopen.api.PlSqlFile

class FakeFile(private val code: String) : PlSqlFile {
    override fun contents(): String {
        return code
    }

    override fun fileName(): String {
        return ""
    }

    override fun type(): PlSqlFile.Type {
        return PlSqlFile.Type.MAIN
    }

}
