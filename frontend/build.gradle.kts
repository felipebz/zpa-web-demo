import com.github.gradle.node.npm.task.NpxTask

plugins {
  java
  id("com.github.node-gradle.node") version "3.2.0"
}

node {
  download.set(true)
  version.set("16.14.0")
}

val buildTask = tasks.register<NpxTask>("buildWebapp") {
  command.set("ng")
  if (project.hasProperty("prod")) {
    args.set(listOf("build", "--prod"))
  } else {
    args.set(listOf("build"))
  }
  dependsOn(tasks.nodeSetup, tasks.npmInstall)
  inputs.dir(project.fileTree("src").exclude("**/*.spec.ts"))
  inputs.dir("node_modules")
  inputs.files("angular.json", ".browserslistrc", "tsconfig.json", "tsconfig.app.json")
  outputs.dir("${project.buildDir}/webapp")
}

sourceSets {
  java {
    main {
      resources {
        // This makes the processResources task automatically depend on the buildWebapp one
        srcDir(buildTask)
      }
    }
  }
}
