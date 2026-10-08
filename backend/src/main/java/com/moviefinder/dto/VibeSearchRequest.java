package com.moviefinder.dto;

public class VibeSearchRequest {

    private String prompt;
    private Integer horror;
    private Integer romance;
    private Integer thriller;
    private Integer comedy;
    private Integer drama;
    private Integer action;
    private Integer mystery;
    private Integer violence;
    private Integer darkness;

    public VibeSearchRequest() {}

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public Integer getHorror() { return horror != null ? horror : 50; }
    public void setHorror(Integer horror) { this.horror = horror; }

    public Integer getRomance() { return romance != null ? romance : 50; }
    public void setRomance(Integer romance) { this.romance = romance; }

    public Integer getThriller() { return thriller != null ? thriller : 50; }
    public void setThriller(Integer thriller) { this.thriller = thriller; }

    public Integer getComedy() { return comedy != null ? comedy : 50; }
    public void setComedy(Integer comedy) { this.comedy = comedy; }

    public Integer getDrama() { return drama != null ? drama : 50; }
    public void setDrama(Integer drama) { this.drama = drama; }

    public Integer getAction() { return action != null ? action : 50; }
    public void setAction(Integer action) { this.action = action; }

    public Integer getMystery() { return mystery != null ? mystery : 50; }
    public void setMystery(Integer mystery) { this.mystery = mystery; }

    public Integer getViolence() { return violence != null ? violence : 50; }
    public void setViolence(Integer violence) { this.violence = violence; }

    public Integer getDarkness() { return darkness != null ? darkness : 50; }
    public void setDarkness(Integer darkness) { this.darkness = darkness; }
}
