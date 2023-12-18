package xyz.cronixzero.votinghelper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
public class ResourceViewerConfiguration {

  @Bean
  public InternalResourceViewResolver internalResourceViewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setSuffix(".html");
    return resolver;
  }
}
