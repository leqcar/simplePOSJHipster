package org.efire.net.application.cucumber.stepdefs;

import org.efire.net.application.SimplePosjHipsterApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SimplePosjHipsterApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
